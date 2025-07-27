# Guide Rapide n8n Cloud

## Configuration Actuelle

- **URL Webhook**: `https://jdvot57.app.n8n.cloud/webhook/chat`
- **Mode**: Développement avec n8n Cloud
- **Status**: Configuré

## Utilisation

1. **Démarrer le serveur de développement**:
   ```bash
   npm run dev
   ```

2. **Tester l'AI Chat**:
   - Ouvrir: http://localhost:3000/ai-chat
   - Envoyer un message de test
   - Vérifier la réponse AI

3. **Monitoring**:
   - Dashboard n8n Cloud: https://cloud.n8n.io/
   - Logs d'exécution dans n8n Cloud

## Commandes Utiles

```bash
# Test de connexion
./scripts/test-n8n-connection.sh

# Test direct du webhook
curl -X POST https://jdvot57.app.n8n.cloud/webhook/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","files":[],"sessionId":"test"}'
```

## Troubleshooting

- **Erreur 404**: Vérifiez que le workflow est activé
- **Erreur de connexion**: Vérifiez l'URL du webhook
- **Timeout**: Vérifiez la complexité du workflow

## Support

- Documentation: https://docs.n8n.io/
- n8n Cloud: https://cloud.n8n.io/
