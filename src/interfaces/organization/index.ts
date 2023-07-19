import { DoctorInterface } from 'interfaces/doctor';
import { FavoriteOrganizationInterface } from 'interfaces/favorite-organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OrganizationInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  doctor?: DoctorInterface[];
  favorite_organization?: FavoriteOrganizationInterface[];
  user?: UserInterface;
  _count?: {
    doctor?: number;
    favorite_organization?: number;
  };
}

export interface OrganizationGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
