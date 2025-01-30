import { ProtectedRoute } from '@/components/auth/protected-route'
import { AdminSettings } from '@/components/admin/settings'

export default function AdminSettingsPage() {
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <AdminSettings />
    </ProtectedRoute>
  )
}
