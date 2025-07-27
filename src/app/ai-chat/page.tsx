import AIChat from '../../features/ai-doctor/AIChat';
import { AuthGuard } from '../../shared/components/AuthGuard';

export default function AIChatPage() {
  return (
    <AuthGuard>
      <AIChat />
    </AuthGuard>
  );
}
