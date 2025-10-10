import { prisma } from "@/prisma-helpers/prisma";
import { getOrderDetail } from "@/prisma-helpers/get-order-detail";
import { getUserData } from "@/prisma-helpers/get-user-data";
import { ClientComment } from "@/app/(private)/comment/client";

const getComments = async (orderId: number) => {
  return prisma.workComment.findMany({
    where: {
      orderId,
    },
    include: {
      user: {
        include: {
          worker: true,
          admin: true,
        },
      },
    },
  });
};

export type CommentType = Awaited<ReturnType<typeof getComments>>;

export async function Comment({ orderId }: { orderId?: string | string[] }) {
  if (!orderId) return null;

  const userData = await getUserData();

  const order = await getOrderDetail(+orderId);

  if (!order || !userData) {
    return null;
  }

  const comments = await getComments(+orderId);

  return (
    <ClientComment order={order} userData={userData} comments={comments} />
  );
}
