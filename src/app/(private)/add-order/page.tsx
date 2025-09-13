import css from "./page.module.scss";
import Button from "@/components/button/button";
import Input from "@/app/login/components/input/input";

export default function AddOrderPage() {
  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Добавление нового заказа</h1>
      <div className={css.row}>
        <Input className={css.col_1} label="Номер заказа" />
        <Input className={css.col_2} label="Заказчик" />
        <Input className={css.col_1} label="Телефон заказчика" />
        <Input className={css.col_1} label="Дата приемки" />
        <Input className={css.col_1} label="Дата выдачи" />
        <Input className={css.col_3} label="Адрес доставки" />
        <Input className={css.col_3} label="Вид работ" />
      </div>

      <div className={css.block}>
        <div className={css.row}>
          <Input className={css.col_1} label="Высота, мм" />
          <Input className={css.col_1} label="Ширина, мм" />
          <Input className={css.col_1} label="Толщина" />
          <Input className={css.col_1} label="Ручка интегрированная" />
          <Input className={css.col_1} label="Радиус завала торца" />
          <Input className={css.col_1} label="Фрезеровка" />
          <Input className={css.col_1} label="Цвет" />
          <Input className={css.col_1} label="Количество" />
        </div>
      </div>

      <Button className={css.buttonAdd} variant="neutral">
        Добавить фасад
      </Button>

      <div className={css.row}>
        <Input className={css.col_1} label="Аванс" />
        <Input className={css.col_1} label="Скидка" />
        <Input className={css.col_1} label="Стоимость 1 кв.м" />
      </div>

      <div className={css.footer}>
        <div>
          <Button variant="neutral">Распечатать Excel</Button>
        </div>
        <Button>Добавить заказ</Button>
      </div>
    </div>
  );
}
