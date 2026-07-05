import { Navigate } from 'react-router-dom';
import { getAdminKey } from '../../api/admin';

export default function ProtectedRoute({ children }) {
  if (!getAdminKey()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}