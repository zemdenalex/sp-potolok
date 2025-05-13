# SP POTOLOK - Веб-система для компании натяжных потолков

Полнофункциональное веб-приложение для компании, специализирующейся на установке натяжных потолков и продаже сопутствующих товаров.

## Общее описание проекта

SP POTOLOK - это веб-приложение для компании, занимающейся установкой натяжных потолков и продажей сопутствующих товаров. Система позволяет пользователям просматривать каталог товаров, добавлять их в корзину, оформлять заказ, а также рассчитывать стоимость услуг с помощью калькулятора.

### Основные функции
- Просмотр каталога товаров по категориям
- Поиск товаров
- Добавление товаров в корзину
- Оформление заказа
- Калькулятор стоимости услуг
- Обратная связь

## Технологический стек

### Frontend
- React 18
- Redux с Redux Toolkit для управления состоянием
- React Router для маршрутизации
- Tailwind CSS для стилизации
- Framer Motion для анимаций
- Axios для HTTP-запросов

### Backend
- Go (Golang)
- Gin (веб-фреймворк)
- sqlx (библиотека для работы с базой данных)

### База данных
- PostgreSQL

### Инфраструктура
- Docker
- Docker Compose

## Как запустить проект локально

### Предварительные требования
- Docker и Docker Compose
- Git

### Шаг 1: Клонирование репозитория

```bash
git clone https://github.com/yourusername/sp-potolok.git
cd sp-potolok
```

### Шаг 2: Создание файла .env

Создайте файл `.env` в корневой директории проекта со следующим содержимым:

```env
# Database configuration
DB_NAME=sppotolok
DB_HOST=db
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_SSLMODE=disable

# Email configuration (для функции обратной связи)
FROM_EMAIL=your_email@gmail.com
FROM_PASSWORD=your_app_password
TO_EMAIL=recipient_email@example.com

# Server configuration
SERVER_PORT=8080
```

Примечание: Для работы функции отправки email необходимо:
1. Использовать Gmail-аккаунт
2. Создать специальный пароль для приложения (app password) в настройках Google-аккаунта
3. Указать этот пароль в поле FROM_PASSWORD

### Шаг 3: Запуск проекта с помощью Docker Compose

```bash
docker-compose up -d
```

При первом запуске будет выполнено:
- Скачивание необходимых Docker-образов
- Сборка контейнеров
- Создание и инициализация базы данных
- Запуск backend- и frontend-серверов

### Шаг 4: Проверка работоспособности

После успешного запуска проект будет доступен по следующим адресам:
- Frontend: http://localhost
- Backend API: http://localhost:8080

### Примечание о миграции базы данных

Если при первом запуске данные не загружаются в базу данных автоматически, необходимо выполнить миграцию вручную:

```bash
# Подключение к контейнеру базы данных
docker exec -it sppotolok-db-1 bash

# Внутри контейнера подключаемся к PostgreSQL
psql -U postgres

# Создаем базу данных (если она еще не создана)
CREATE DATABASE sppotolok;
\c sppotolok

# Выходим из PostgreSQL
\q

# Копируем SQL-файл миграции в контейнер
exit
docker cp server/migrations/create_all.up.sql sppotolok-db-1:/tmp/

# Снова подключаемся к контейнеру
docker exec -it sppotolok-db-1 bash

# Запускаем SQL-скрипт
psql -U postgres -d sppotolok -f /tmp/create_all.up.sql

# Выходим из контейнера
exit

# Перезапускаем контейнер с приложением
docker-compose restart app
```

## Разработка

### Модификация frontend

Если вы хотите внести изменения во frontend-часть:

1. Остановите контейнер с frontend:
   ```bash
   docker-compose stop site
   ```

2. Запустите frontend локально в режиме разработки:
   ```bash
   cd site
   npm install
   npm run dev
   ```

3. Внесите необходимые изменения в код
4. После завершения изменений, остановите локальный сервер (Ctrl+C) и перезапустите контейнер:
   ```bash
   docker-compose up -d site
   ```

### Модификация backend

Если вы хотите внести изменения в backend-часть:

1. Внесите изменения в код Go
2. Перестройте и перезапустите контейнер:
   ```bash
   docker-compose up -d --build app
   ```

## Структура проекта

```
sp-potolok/
├── server/               # Серверная часть (Go)
│   ├── cmd/              # Точка входа приложения
│   ├── internal/         # Внутренние пакеты
│   │   ├── handler/      # HTTP-обработчики
│   │   ├── repository/   # Работа с базой данных
│   │   └── service/      # Бизнес-логика
│   ├── migrations/       # SQL-скрипты для миграции
│   └── templates/        # Шаблоны для email-сообщений
├── site/                 # Клиентская часть (React)
│   ├── public/           # Статические файлы
│   ├── src/              # Исходный код
│   │   ├── components/   # React-компоненты
│   │   ├── features/     # Redux-слайсы
│   │   └── Pages/        # Страницы приложения
│   └── package.json      # Зависимости
└── docker-compose.yml    # Конфигурация Docker Compose
```


## Авторы

- Земцов Денис - бэкенд, помощь с фронтендом
- Тотоева Алина - дизайн, фронтенд
