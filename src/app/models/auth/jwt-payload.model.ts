import type { UserRole } from '@models/users/user-role.model';
import type { JwtPayload } from 'jwt-decode';

export interface CustomJwtPayload extends JwtPayload {
  sub: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
