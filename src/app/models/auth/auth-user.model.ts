import type { UserRole } from '@models/users/user-role.model';

export interface IAuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
