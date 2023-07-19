const mapping: Record<string, string> = {
  doctors: 'doctor',
  'favorite-organizations': 'favorite_organization',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
