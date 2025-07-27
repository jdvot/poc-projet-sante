/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from 'firebase-functions';
import { onRequest } from 'firebase-functions/v2/https';
import cors from 'cors';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Configuration CORS
const corsHandler = cors({ origin: true });

// Configuration n8n
const N8N_WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL || 'https://jdvot57.app.n8n.cloud/webhook/chat';
const N8N_API_KEY = process.env.N8N_API_KEY;

interface N8NResponse {
  response: string;
  processingTime?: number;
  fileAnalysis?: {
    fileName: string;
    summary: string;
  }[];
}

// Fonction pour convertir un fichier en base64
async function fileToBase64(file: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

// API n8n pour Firebase Functions
export const n8nChat = onRequest(
  {
    maxInstances: 5,
    timeoutSeconds: 30,
    memory: '256MiB',
  },
  async (req, res) => {
    return corsHandler(req, res, async () => {
      try {
        // Vérifier la méthode HTTP
        if (req.method !== 'POST') {
          return res.status(405).json({ error: 'Method not allowed' });
        }

        const { message, files = [], sessionId } = req.body;

        // Validation des données
        if (!message && (!files || files.length === 0)) {
          return res.status(400).json({
            error: 'Either message or at least one file is required',
          });
        }

        // Préparer les données pour n8n
        const filesWithContent = await Promise.all(
          files.map(async (file: any) => ({
            name: file.name,
            size: file.size,
            type: file.type,
            content: file.content || (await fileToBase64(file)),
          }))
        );

        const n8nPayload = {
          message,
          files: filesWithContent,
          timestamp: new Date().toISOString(),
          sessionId: sessionId || 'default',
        };

        console.log('Sending to n8n:', N8N_WEBHOOK_URL);

        // Envoyer à n8n
        const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(N8N_API_KEY && { Authorization: `Bearer ${N8N_API_KEY}` }),
          },
          body: JSON.stringify(n8nPayload),
          signal: AbortSignal.timeout(30000), // 30 second timeout
        });

        if (!n8nResponse.ok) {
          const errorText = await n8nResponse.text();
          console.error('n8n HTTP error:', n8nResponse.status, errorText);
          throw new Error(
            `n8n HTTP error: ${n8nResponse.status} - ${errorText}`
          );
        }

        const responseText = await n8nResponse.text();

        if (!responseText || responseText.trim() === '') {
          throw new Error('n8n returned empty response');
        }

        let n8nData: N8NResponse;
        try {
          n8nData = JSON.parse(responseText);
        } catch (parseError) {
          console.error('n8n JSON parse error:', parseError);
          throw new Error('n8n returned invalid JSON');
        }

        return res.status(200).json({
          response: n8nData.response,
          processingTime: n8nData.processingTime,
          fileAnalysis: n8nData.fileAnalysis,
          model: 'gemini-pro',
          hasFiles: files.length > 0,
          fileCount: files.length,
          contentType: files.length > 0 ? 'document' : 'text',
        });
      } catch (error) {
        console.error('n8n Chat API error:', error);

        return res.status(500).json({
          error:
            error instanceof Error ? error.message : 'Unknown error occurred',
          response: 'Service temporarily unavailable. Please try again later.',
        });
      }
    });
  }
);

// API de santé pour Firebase Functions
export const health = onRequest(
  {
    maxInstances: 2,
    timeoutSeconds: 10,
  },
  (req, res) => {
    return corsHandler(req, res, () => {
      res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        n8nUrl: N8N_WEBHOOK_URL,
      });
    });
  }
);

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
