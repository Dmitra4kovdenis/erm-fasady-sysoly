
## Как работать

### Первый запуск проекта
1. Добавить .env переменные
2. Сгенерировать типы `npx prisma generate`
3. Обновить начальные значения БД `npm run initialize`
4. Запустить `npm run dev`

### После `git pull`
1. Обновить миграции БД `npx prisma migrate dev`
2. Сгенерировать типы `npx prisma generate`
3. Обновить начальные значения БД `npm run initialize`

### После обновления модели БД
1. Создать файл миграции `npx prisma migrate dev --name #Название-миграции`
2. Применить миграцию `npx prisma migrate dev`
3. Обновить клиента `npx prisma generate`
4. Узнать статус `npx prisma migrate status`


### Команды работы с Prisma
* Удаление данных в БД `npx prisma migrate reset`
* Генерация клиента Prisma `npx prisma generate`
* Открыть веб-интерфейс `npx prisma studio`
* Синхронизация схемы `npx prisma db push`
* Применение миграций `npx prisma migrate deploy`
* 



