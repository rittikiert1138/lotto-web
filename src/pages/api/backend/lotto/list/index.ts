import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const lottos = await prisma.lotto.findMany({
      include: {
        lotto_type: {
          select: {
            lotto_type_name: true,
          },
        },
      },
    });

    res.status(200).json({
      status: true,
      message: "ดึงข้อมูลหวยสำเร็จ",
      lottos,
    });
  } catch (error: any) {
    console.log("Error ==>", error?.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
