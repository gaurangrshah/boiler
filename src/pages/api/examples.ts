// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../server/db/client';

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  const preferences = await prisma.preference.findMany();
  res.status(200).json(preferences);
};

export default examples;
