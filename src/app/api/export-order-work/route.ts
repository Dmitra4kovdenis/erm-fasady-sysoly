import { prisma } from "@/prisma-helpers/prisma";
import ExcelJS from "exceljs";
import path from "path";
import { NextResponse } from "next/server";

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

  // Загружаем шаблон
  const templatePath = path.join(
    process.cwd(),
    "public/templates",
    "work-template.xlsx",
  );
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);

  const sheet = workbook.getWorksheet(1);

  if (!sheet) throw new Error("No worksheet");

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

  // Заполняем верхние данные
  sheet.getCell("C2").value = order.orderNumber;
  sheet.getCell("H3").value = order.customer.phone;
  sheet.getCell("H4").value = order.deliveryAddress;
  sheet.getCell("C3").value = order.startDate.toLocaleDateString("ru-RU");
  sheet.getCell("C4").value = order.endDate.toLocaleDateString("ru-RU");
  sheet.getCell("H2").value = order.customer.name;
  sheet.getCell("C5").value = order.workType;
  // sheet.getCell("J54").value = order.unitCost;
  // sheet.getCell("J56").value = order.millingArea;
  // sheet.getCell("J57").value = order.costOfMilling;
  // sheet.getCell("J58").value = order.handleLength;
  // sheet.getCell("J59").value = order.costOfHandle;
  // sheet.getCell("J60").value = order.costOtherServices;
  // sheet.getCell("J62").value = order.discount;
  // sheet.getCell("J64").value = order.prepayment;
  sheet.getCell("J32").value = order.itemsCount;

  // Добавляем фасады
  let startRow = 8;
  for (const f of order.items) {
    const row = sheet.getRow(startRow++);
    row.getCell(1).value = startRow - 8;
    row.getCell(2).value = f.height;
    row.getCell(3).value = f.width;
    row.getCell(4).value = f.count;
    row.getCell(5).value = f.thickness;
    row.commit();
  }

  // Итог
  // const totalRow = sheet.getRow(startRow);
  // totalRow.getCell(1).value = "Итого:";
  // totalRow.getCell(4).value = { formula: `SUM(D10:D${startRow - 1})` };
  // totalRow.getCell(6).value = { formula: `SUM(F10:F${startRow - 1})` };
  // totalRow.commit();

  // Отдаём как файл
  const buffer = await workbook.xlsx.writeBuffer();
  const filename = `work-${orderId}.xlsx`;

  return new Response(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
