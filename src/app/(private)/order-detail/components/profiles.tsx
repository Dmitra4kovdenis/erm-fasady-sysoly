import { addWorker, removeWorker } from "@/app/(private)/order-detail/actions";
import { OrderDetailType } from "@/prisma-helpers/get-order-detail";
import { UserData } from "@/prisma-helpers/get-user-data";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import InputLabel from "@mui/material/InputLabel";
import { Workers } from "@/app/(private)/order-detail/server";

interface ProfilesProps {
  order: NonNullable<OrderDetailType>;
  userData: UserData;
  workers: Workers;
}

export function Profiles({ order, workers }: ProfilesProps) {
  const checkedWorkers: number[] = order.workers?.map((item) => item.id) ?? [];

  const handleChange = async (workerId: number) => {
    if (checkedWorkers.includes(workerId)) {
      await removeWorker(order.id, workerId);
    } else {
      await addWorker(order.id, workerId);
    }
  };

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Сейчас работают над заказом</InputLabel>
        <Select
          multiple
          value={checkedWorkers}
          label="Сейчас работают над заказом"
          renderValue={() =>
            order.workers.map((item) => item.name).join(", ") ?? "Не выбран"
          }
        >
          {workers.map((worker) => (
            <MenuItem
              key={worker.id}
              value={worker.id}
              onClick={() => handleChange(worker.id)}
            >
              <Checkbox checked={checkedWorkers.includes(worker.id)} />
              <ListItemText primary={worker.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
