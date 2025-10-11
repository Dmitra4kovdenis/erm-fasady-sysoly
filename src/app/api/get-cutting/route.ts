import { NextResponse } from "next/server";
import { MaxRectsPacker, Rectangle } from "maxrects-packer";
import PDFDocument from "pdfkit";
import path from "path";
import { prisma } from "@/prisma-helpers/prisma";

export const runtime = "nodejs"; // важно для PDFKit

interface PackerElement {
  width: number;
  height: number;
  data: { id: number; name: string };
}

const SHEET_WIDTH = 2780; // мм, или пиксели для PDF
const SHEET_HEIGHT = 2050;
const KERF = 3;
const SCALE = 0.9; // масштаб для PDF, чтобы влезло на страницу

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ error: "orderId is required" }, { status: 404 });

  const orderId = +id;

  const result = await prisma.facade.findMany({
    where: {
      orderId,
    },
  });

  let counter = 0;
  const parts = result.reduce<PackerElement[]>((acc, item) => {
    const elements = Array.from({ length: item.count }).map(() => ({
      width: item.width,
      height: item.height,
      data: {
        id: item.id,
        name: `Фасад ${++counter}`,
      },
    }));

    return acc.concat(elements);
  }, []);

  // Инициализируем упаковщик
  const packer = new MaxRectsPacker(SHEET_WIDTH, SHEET_HEIGHT, KERF, {
    smart: true,
    pot: false,
    square: false,
  });
  packer.addArray(parts as Rectangle[]);

  // Создаём PDF
  const doc = new PDFDocument({
    size: [SHEET_WIDTH + 40 * SCALE, SHEET_HEIGHT + 40 * SCALE],
    margin: 10,
  });

  // Буфер для сборки PDF
  const buffers: Uint8Array[] = [];
  doc.on("data", (chunk) => buffers.push(chunk));
  const done = new Promise<Buffer>((resolve) =>
    doc.on("end", () => resolve(Buffer.concat(buffers))),
  );

  // Подключаем шрифт с кириллицей
  const fontPath = path.join(
    process.cwd(),
    "public/Roboto/static/Roboto-Regular.ttf",
  );
  doc.registerFont("Roboto", fontPath);
  doc.font("Roboto");

  // Рисуем каждый лист
  packer.bins.forEach((bin, index) => {
    if (index > 0) {
      doc.addPage({
        size: [SHEET_WIDTH * SCALE + 40, SHEET_HEIGHT * SCALE + 60],
        margin: 20,
      });
    }

    doc.save(); // сохранить state

    doc.fontSize(40).text(`Лист ${index + 1}`, 20, 20);

    doc.translate(20, 80);
    doc.scale(SCALE, SCALE);

    doc.rect(0, 0, SHEET_WIDTH, SHEET_HEIGHT).stroke();

    // рисуем только корректные прямоугольники
    bin.rects
      .filter((r) => r.x != null && r.y != null && r.width && r.height)
      .forEach((r) => {
        doc.rect(r.x, r.y, r.width - KERF, r.height - KERF).stroke();

        doc.fontSize(40).text(r.data?.name, r.x, r.y + r.height / 2 - 20, {
          width: r.width,
          align: "center",
        });
        doc
          .fontSize(40)
          .text(`(${r.width}×${r.height})`, r.x, r.y + r.height / 2 + 40, {
            width: r.width,
            align: "center",
          });
      });

    doc.restore(); // восстановить state
  });

  doc.end();

  const pdfBuffer = await done;

  return new NextResponse(pdfBuffer as any, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=cutting-map.pdf",
    },
  });
}
