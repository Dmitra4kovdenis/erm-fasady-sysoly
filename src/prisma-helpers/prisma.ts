import { PrismaClient } from "@prisma/client";
export * from "@prisma/client";

console.log("Prisma Init", { database: process.env.PRISMA_DATABASE });

const prismaClientSingleton = () => {
  console.log("Prisma Singleton", { database: process.env.PRISMA_DATABASE });

  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["query", "error", "warn"],
  });
};

declare const globalThis: {
  prismaGlobal?: PrismaClient;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}
