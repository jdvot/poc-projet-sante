import AIDoctor from '../../features/ai-doctor/AIDoctor';
import { AuthGuard } from '../../shared/components/AuthGuard';

export default function AIDoctorPage() {
  return (
    <AuthGuard>
      <AIDoctor />
    </AuthGuard>
  );
}
