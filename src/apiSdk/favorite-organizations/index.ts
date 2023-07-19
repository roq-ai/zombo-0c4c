import axios from 'axios';
import queryString from 'query-string';
import { FavoriteOrganizationInterface, FavoriteOrganizationGetQueryInterface } from 'interfaces/favorite-organization';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFavoriteOrganizations = async (
  query?: FavoriteOrganizationGetQueryInterface,
): Promise<PaginatedInterface<FavoriteOrganizationInterface>> => {
  const response = await axios.get('/api/favorite-organizations', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFavoriteOrganization = async (favoriteOrganization: FavoriteOrganizationInterface) => {
  const response = await axios.post('/api/favorite-organizations', favoriteOrganization);
  return response.data;
};

export const updateFavoriteOrganizationById = async (
  id: string,
  favoriteOrganization: FavoriteOrganizationInterface,
) => {
  const response = await axios.put(`/api/favorite-organizations/${id}`, favoriteOrganization);
  return response.data;
};

export const getFavoriteOrganizationById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/favorite-organizations/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteFavoriteOrganizationById = async (id: string) => {
  const response = await axios.delete(`/api/favorite-organizations/${id}`);
  return response.data;
};
