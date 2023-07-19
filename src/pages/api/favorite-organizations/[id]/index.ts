import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { favoriteOrganizationValidationSchema } from 'validationSchema/favorite-organizations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.favorite_organization
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFavoriteOrganizationById();
    case 'PUT':
      return updateFavoriteOrganizationById();
    case 'DELETE':
      return deleteFavoriteOrganizationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFavoriteOrganizationById() {
    const data = await prisma.favorite_organization.findFirst(
      convertQueryToPrismaUtil(req.query, 'favorite_organization'),
    );
    return res.status(200).json(data);
  }

  async function updateFavoriteOrganizationById() {
    await favoriteOrganizationValidationSchema.validate(req.body);
    const data = await prisma.favorite_organization.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteFavoriteOrganizationById() {
    const data = await prisma.favorite_organization.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
