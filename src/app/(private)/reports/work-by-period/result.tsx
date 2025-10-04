"use client";

import { WorkByPeriodType } from "@/app/(private)/reports/work-by-period/page";
import { PageContainer } from "@/components/page-container/page-container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { formatDate } from "@/utils";

export interface WorkByPeriodClientProps {
  workByPeriod: WorkByPeriodType;
}

export function WorkByPeriodResult({ workByPeriod }: WorkByPeriodClientProps) {
  let itemsCount = 0;
  let totalArea = 0;

  workByPeriod.forEach((item) => {
    itemsCount += item.itemsCount;
    totalArea += item.totalArea;
  });

  return (
    <PageContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Трудосписания</TableCell>
            <TableCell align="right">Число фасадов</TableCell>
            <TableCell align="right">Метры в квадрате</TableCell>
            <TableCell align="right">Тариф</TableCell>
            <TableCell align="right">Заработал</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow style={{ backgroundColor: "#ededed" }}>
            <TableCell>Всего</TableCell>
            <TableCell></TableCell>
            <TableCell align="right">{itemsCount}</TableCell>
            <TableCell align="right">{totalArea}</TableCell>
            <TableCell align="right">10 руб./м2</TableCell>
            <TableCell align="right">{totalArea * 10}</TableCell>
          </TableRow>
          {workByPeriod.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.orderNumber}</TableCell>
              <TableCell>
                {item.timeLines?.map((item) => (
                  <div key={item.id}>
                    {`${formatDate(item.dateStart)} - ${formatDate(item.dateEnd)} (${item.comment})`}
                  </div>
                ))}
              </TableCell>
              <TableCell align="right">{item.itemsCount}</TableCell>
              <TableCell align="right">{item.totalArea}</TableCell>
              <TableCell align="right">10 руб./м2</TableCell>
              <TableCell align="right">{item.totalArea * 10}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PageContainer>
  );
}
