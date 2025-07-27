import Dashboard from '../../features/dashboard/Dashboard';
import { AuthGuard } from '../../shared/components/AuthGuard';

export default function DashboardPage() {
  return (
    <AuthGuard>
      <Dashboard />
    </AuthGuard>
  );
}
