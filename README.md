
## Как работать

### Первый запуск проекта
1. Добавить .env переменные
2. Сгенерировать типы `npx prisma generate`
3. Обновить начальные значения БД `npm run initialize`
4. Запустить `npm run dev`


### Команды работы с Prisma
* Удаление данных в БД `npx prisma migrate reset`
* Генерация клиента Prisma `npx prisma generate`
* Открыть веб-интерфейс `npx prisma studio`
* Синхронизация схемы `npx prisma db push`
* Узнать статус `npx prisma migrate status`



### Инициализация (Безопасная, не сносить БД)
Можно сколько угодно раз вызывать
* Роли `node scripts/make-work-types.js`
* Статусы `node scripts/make-roles.js `