"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { OrdersType } from "@/prisma-helpers/get-orders";

interface OrderListProps {
    orders: OrdersType;
}

function OrderListClient({ orders }: OrderListProps) {
    return (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ p: 2 }}>
                Список заказов
            </Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell># Заказа</TableCell>
                        <TableCell>Заказчик</TableCell>
                        <TableCell>Статус</TableCell>
                        <TableCell>Заказ</TableCell>
                        <TableCell>Время начала</TableCell>
                        <TableCell>Дедлайн</TableCell>
                        <TableCell align="center">Действия</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow key={order.orderNumber}>
                            <TableCell>{order.orderNumber}</TableCell>
                            <TableCell>
                                {order.customer.name}{" "}
                                {order.customer.company && `(${order.customer.company})`}
                            </TableCell>
                            <TableCell>{order.status  }</TableCell>
                            <TableCell>{order.product}</TableCell>
                            <TableCell>
                                {new Date(order.startDate).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                {new Date(order.deadline).toLocaleDateString()}
                            </TableCell>
                            <TableCell align="center">
                                <IconButton
                                    color="primary"
                                    onClick={() => console.log("Edit", order.orderNumber)}
                                >
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default OrderListClient;
