import Settings from '../../features/settings/Settings';
import { AuthGuard } from '../../shared/components/AuthGuard';

export default function SettingsPage() {
  return (
    <AuthGuard>
      <Settings />
    </AuthGuard>
  );
}
