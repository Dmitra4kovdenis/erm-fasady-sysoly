import { prisma } from "@/prisma-helpers/prisma";
import ExcelJS from "exceljs";
import path from "path";
import { NextResponse } from "next/server";
import { ColorType } from "@/app/(private)/add-order/constants";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id)
    return NextResponse.json({ error: "orderId is required" }, { status: 404 });

  const orderId = +id;

  if (isNaN(orderId)) {
    return NextResponse.json({ error: "Invalid order id" }, { status: 400 });
  }

  // Загружаем заказ
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      customer: true,
      items: { include: { milling: true, handle: true } },
    },
  });

  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const fileName =
    order.colorTypeId === ColorType.filmCoating
      ? "zakaz-naryad-emal.xlsx"
      : "zakaz-naryad-plenka.xlsx";

  // Загружаем шаблон
  const templatePath = path.join(process.cwd(), "public/templates", fileName);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);

  const sheet = workbook.getWorksheet(1);

  if (!sheet) throw new Error("No worksheet");

  // Заполняем верхние данные
  sheet.getCell("C2").value = order.orderNumber;
  sheet.getCell("H3").value = order.customer.phone;
  sheet.getCell("H4").value = order.deliveryAddress;
  sheet.getCell("C3").value = order.startDate.toLocaleDateString("ru-RU");
  sheet.getCell("C4").value = order.endDate.toLocaleDateString("ru-RU");
  sheet.getCell("H2").value = order.customer.name;
  sheet.getCell("C5").value = order.workType;
  sheet.getCell("J32").value = order.itemsCount;
  sheet.getCell("C32").value = order.totalArea;

  // Добавляем фасады
  let startRow = 8;
  for (const f of order.items) {
    const row = sheet.getRow(startRow++);
    row.getCell(1).value = startRow - 8;
    row.getCell(2).value = f.height;
    row.getCell(3).value = f.width;
    row.getCell(4).value = f.count;
    row.getCell(5).value = f.thickness;
    row.getCell(6).value = f.radius;
    row.getCell(7).value = f.handle.title;
    row.getCell(8).value = f.milling.title;
    row.getCell(9).value = f.color;
    row.getCell(10).value = f.width * f.height * f.count * 0.000001;
    row.commit();
  }

  // Отдаём как файл
  const buffer = await workbook.xlsx.writeBuffer();
  const filename = `${order.orderNumber}-${fileName}`;

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
