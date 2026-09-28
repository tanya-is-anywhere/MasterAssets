# MasterAssets
Данный репозиторий представляет собой реализацию индивидуального проекта по дисциплине FullStack (Разработка полного цикла). Тема: "Поиск стилистически похожих графических ассетов". Имеет высокий уровень актуальности, так как заменяет множество часов поиска парой минут взаимодействия с удобным инструментом.

## Технологический стек

| Слой          | Технологии                              |
|---------------|-----------------------------------------|
| База данных   | PostgreSQL 16                           |
| Управление БД | DBeaver, Alembic                        |
| Бэкенд        | FastAPI, SQLAlchemy, JWT                |
| Фронтенд      | React, Vite, Axios, TypeScript, Mantine |
| Дизайн        | Figma, Mantine                          |

# Лабораторная работа № 1
### Основные экраны
Auth — вход + регистрация в одном экране (табы).

Библиотека — грид + правая панель + модальное окно загрузки.

Настройки — смена пароля, параметры поиска.

### Основные пользовательские сценарии
#### Группа 1: Вход

Как пользователь, я хочу зарегистрироваться по email+паролю, чтобы получить доступ к своей библиотеке.

Как пользователь, я хочу войти в существующий аккаунт, чтобы продолжить работу.

Как пользователь, я хочу выйти из аккаунта, чтобы обезопасить данные на общем устройстве.

#### Группа 2: Библиотека

Как пользователь, я хочу увидеть общую библиотеку ассетов, чтобы понять, что вообще есть.

Как пользователь, я хочу выбрать ассет из библиотеки, чтобы посмотреть детали (превью, метаданные, дата загрузки).

Как пользователь, я хочу выбрать ассет и нажать «найти похожие», чтобы увидеть топ-5 стилистически близких.

Как пользователь, я хочу посмотреть результат поиска, сравнить варианты и определиться с выбором.

Как пользователь, я хочу вернуться из результатов к библиотеке, чтобы продолжить работу.

Как пользователь, я хочу фильтровать/сортировать библиотеку (по дате, имени, тегам) — чтобы быстрее находить.

Как пользователь, я хочу удалить ассет, который добавил самостоятельно, если он больше не нужен.

#### Группа 3: Пополнение библиотеки

Как пользователь, я хочу загрузить одно изображение в общую базу через drag-and-drop, чтобы добавить его в библиотеку.

Как пользователь, я хочу загрузить пачку изображений (папку), чтобы не делать это по одному.

Как пользователь, я хочу видеть прогресс загрузки и эмбеддинга (потому что CLIP на 100 картинок работает несколько секунд).

Как пользователь, я хочу увидеть ошибки (битый файл, неподдерживаемый формат, дубль), чтобы понимать, что не так.

Как пользователь, я хочу добавить теги/описание к ассету, чтобы потом искать по ним.

#### Группа 4: Профиль / настройки

Как пользователь, я хочу сменить пароль или email.

Как пользователь, я хочу настроить параметры поиска (например, метрику похожести, размер топ-N).

Как пользователь, я хочу видеть статистику (сколько ассетов, сколько места занято).

### Скриншоты интерфейса (Версия 1)
![Страница-входа](docs/screenshots/in-page1.png)
![Страница-регистрации](docs/screenshots/reg-page1.png)
![Страница-библиотеки](docs/screenshots/settings-page-part1-1.png)
![Страница-настроек](docs/screenshots/settings-page-part2-1.png)

### Инструкция по запуску фронтенда
1. Установите необходимые Node.js, React, Vite, TypeScript компоненты.
2. Перейдите в папку /frontend проекта.
3. Запустите командой в терминале: npm run dev (пока для разработки).

### Скриншоты интерфейса (Версия 2)
![Страница-входа](docs/screenshots/in-page1.png)
![Страница-регистрации](docs/screenshots/reg-page1.png)
![Страница-настроек](docs/screenshots/settings-page-v2.png)
![Страница-профиль](docs/screenshots/settings-page-2-v2.png)
![Страница-загрузки](docs/screenshots/load-assets.png)
![Страница-библиотеки](docs/screenshots/library-1.png)
![Страница-библиотеки](docs/screenshots/library-2.png)
![Страница-библиотеки](docs/screenshots/library-3.png)
---
# Лабораторная работа № 2
## Asset Similarity — Backend

Backend для поиска стилистически похожих графических ассетов.

**Стек:** Python 3.11 + FastAPI + SQLAlchemy 2.0 + Alembic + PostgreSQL 16 + pgvector + JWT

## Быстрый старт

### Требования
- Python 3.11+
- Docker + Docker Compose
- Git

### 1. Клонирование и переход в backend

```bash
git clone <repo-url>
cd MasterAssets/backend
```
```bash
python -m venv .venv
```
#### Windows (PowerShell)
```bash
.venv\Scripts\Activate.ps1
```
#### Windows (CMD)
```bash
.venv\Scripts\activate.bat
```
#### Linux / macOS / Git Bash
```bash
source .venv/bin/activate
```

#### Установка зависимостей
```bash
pip install -e ".[dev]"
```

#### Переменные окружения
```bash
cp .env.example .env
```

Запуск PostgreSQL
```bash
docker compose up -d
```

Подготовка БД — миграции Alembic
```bash
cd backend
alembic upgrade head
```

Что произойдёт:
- Установится расширение vector (pgvector).
- Создадутся таблицы:
- - users
- - tags
- - assets (с колонкой color_histogram vector(96) и HNSW-индексом)
- - asset_tags (M:N)
- - alembic_version (служебная)

Проверка (должно быть 5 таблиц)
```bash
docker exec -it asset_similarity_db psql -U asset_user -d asset_db -c "\dt"
```

Запуск backend
```bash
uvicorn app.main:app --reload --reload-dir app
```

Проверка (ответ: {"status":"ok"})
```bash
curl http://localhost:8000/health
```

## Модели данных

### users
- `id` — PK
- `email` — уникальный, индексирован
- `hashed_password` — Argon2-хеш (через `pwdlib`)
- `name` — отображаемое имя
- `created_at`, `updated_at`

### assets
- `id` — PK
- `file_name`, `file_path` (уникальный), `mime_type`
- `width`, `height`, `size_bytes`
- `owner_id` — FK → `users.id`, `ON DELETE CASCADE`
- `created_at`, `updated_at`

### tags
- `id` — PK
- `name` — уникальный, индексирован
- `created_at`, `updated_at`

### asset_tags (ассоциативная таблица M:N)
- `asset_id` — FK → `assets.id`, `ON DELETE CASCADE`
- `tag_id` — FK → `tags.id`, `ON DELETE CASCADE`
- PK: `(asset_id, tag_id)`

### Связи
- **User 1:N Asset** — у пользователя много ассетов.
- **Asset M:N Tag** — через `asset_tags`.

## API Endpoints

### Auth
- `POST /api/v1/auth/register` — регистрация (email, name, password)
- `POST /api/v1/auth/login` — вход, возвращает JWT
- `GET /api/v1/auth/me` — текущий пользователь (Bearer token)

### Assets (все требуют Bearer token)
- `GET /api/v1/assets?page=1&page_size=50` — список своих ассетов с пагинацией
- `POST /api/v1/assets/upload` — загрузка файла (multipart/form-data, поле `file`)
- `GET /api/v1/assets/{id}` — детали ассета
- `PATCH /api/v1/assets/{id}` — обновление тегов (`{"tags": ["a", "b"]}`)
- `DELETE /api/v1/assets/{id}` — удаление

### HTTP Status Codes
| Код | Когда |
|-----|-------|
| 200 | Успешный GET/PATCH |
| 201 | Создан (register, upload) |
| 204 | Удалён (DELETE) |
| 400 | Неверный файл (формат, размер) |
| 401 | Не авторизован |
| 404 | Ресурс не найден или принадлежит другому пользователю |
| 409 | Email занят |
| 422 | Ошибка валидации тела |

### Изоляция данных
Каждый пользователь видит **только свои** ассеты. Запрос чужого возвращает **404** (не 403) — чтобы не выдавать факт его существования.

### Ограничения загрузки
- Форматы: PNG, JPEG, WebP, SVG
- Максимальный размер: 10 МБ
- Имя файла генерируется (UUID) — коллизии исключены

## Признаки похожести (features)

Для каждого ассета вычисляются визуальные признаки **без нейросетей** — быстро, детерминированно, через `Pillow` + `numpy`.

### Извлекаемые признаки

| Признак | Размер | Что отражает |
|---------|--------|--------------|
| `color_histogram` | 96 чисел | Распределение цветов (32 бина × 3 канала RGB), нормализовано (сумма = 1) |
| `phash` | 16 hex | Перцептивный хеш — устойчив к масштабу и сжатию |
| `avg_color_rgb` | `#RRGGBB` | Средний цвет |
| `brightness` | `0..1` | Средняя яркость |
| `contrast` | `0..1` | Стандартное отклонение яркости |
| `aspect_ratio` | число | Соотношение сторон (w/h) |

### Обработка изображений

1. Открытие через `Pillow`.
2. Применение EXIF-трансформации (`ImageOps.exif_transpose`) — учёт ориентации.
3. **Обработка прозрачности**: PNG с альфа-каналом накладываются на **белый фон**.
4. Ресайз до макс. 512×512 для скорости.
5. Нормализация гистограммы (сумма = 1) — независимость от размера.

**SVG не обрабатывается** — Pillow не читает векторный формат. Признаки остаются `NULL`.

### Поиск похожих

**Как работает:**

1. Целевой ассет имеет вектор `color_histogram` (96 чисел).
2. Ищем ближайшие векторы среди **ассетов того же пользователя**.
3. **Метрика:** косинусное расстояние (`<=>` в pgvector).
4. **Результат:** `similarity = 1 - distance` в диапазоне `0..1`.
5. **Индекс:** HNSW на `color_histogram` для быстрого поиска.

**Почему косинусное расстояние, а не евклидово:**
Гистограммы — это **распределения**, важно **направление** вектора, а не его длина. Косинусное расстояние устойчиво к нормализации и хорошо работает с такими векторами.

**Почему не CLIP (пока):**
CLIP требует `torch` (~2 ГБ), GPU или терпения на CPU. Вычисляемые метрики — быстрые, интерпретируемые, дают **работающий поиск** без ML. CLIP — потенциальное расширение.

### Индекс HNSW

```sql
CREATE INDEX ix_assets_color_histogram_hnsw
ON assets USING hnsw (color_histogram vector_cosine_ops);
```

- **HNSW** — приблизительный поиск ближайших соседей (ANN).
- **`vector_cosine_ops`** — оператор **косинусного** расстояния. Должен совпадать с оператором в SQL-запросе (`<=>`).

**Пример `.env`:**
```dotenv
DEBUG=true
DATABASE_URL=postgresql+psycopg://asset_user:asset_password@localhost:5432/asset_db
JWT_SECRET_KEY=change-me-in-production
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=1440
STORAGE_PATH=data/assets
CORS_ORIGINS=["http://localhost:5173","http://127.0.0.1:5173"]
```

**Сгенерировать `JWT_SECRET_KEY`:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(64))"
```

**Проверка:**
```bash
docker compose ps
```

Контейнер `asset_similarity_db` должен быть в статусе `Up (healthy)`.

### Скриншоты работы (лабораторная №2)

#### 1. Swagger — все эндпоинты
![Swagger Overview](docs/screenshots/lab2/01-swagger-overview.png)

#### 2. Регистрация — 201 Created
![Register](docs/screenshots/lab2/02-register-201.png)

#### 3. Логин — 200 OK с JWT
![Login](docs/screenshots/lab2/03-login-200.png)

#### 4. Загрузка ассета — 201 Created
![Upload](docs/screenshots/lab2/04-upload-201.png)

#### 5. Поиск похожих — 200 OK
![Similar](docs/screenshots/lab2/05-similar-200.png)

#### 6. Без токена — 401 Unauthorized
![401](docs/screenshots/lab2/06-assets-401.png)

#### 7. Несуществующий ассет — 404 Not Found
![404](docs/screenshots/lab2/07-asset-404.png)

#### 8. Docker — контейнер healthy
![Docker](docs/screenshots/lab2/08-docker-ps.png)

#### 9. Alembic — текущая миграция
![Alembic](docs/screenshots/lab2/09-alembic-current.png)

#### 10. Таблицы в БД — 5 штук
![Tables](docs/screenshots/lab2/10-tables.png)

#### 11. Структура таблицы `assets` с FK и индексами
![Assets structure](docs/screenshots/lab2/11-assets-structure.png)

---
# Лабораторная работа № 3 — Архитектура frontend и динамический интерфейс

## Стек

React 18 + TypeScript + Vite + Mantine UI + Axios + React Router.

## Структура проекта (упрощённый FSD)

```
frontend/src/
├── api/                    # HTTP-клиент и запросы к API
│   ├── client.ts           # axios instance + JWT interceptor
│   ├── auth.ts             # login, register, getMe, changePassword
│   ├── assets.ts           # getAssets, upload, delete, findSimilar
│   └── search.ts           # (зарезервировано под расширения поиска)
├── assets/                 # статические файлы фронта (картинки)
│   ├── hero.png
│   ├── img.png
│   ├── react.svg
│   └── vite.svg
├── components/             # переиспользуемые UI-компоненты
│   ├── AssetCard.tsx       # карточка ассета в гриде
│   ├── AssetGrid.tsx       # сетка карточек + состояния loading/empty
│   ├── AssetDetailPanel.tsx    # правая панель с деталями
│   ├── SimilarResults.tsx  # список похожих ассетов
│   ├── UploadDropzone.tsx  # drag-and-drop зона
│   ├── UploadItemRow.tsx   # строка одного файла в списке загрузки
│   └── Header.tsx          # хедер с навигацией и меню пользователя
├── context/                # глобальное состояние
│   └── AuthContext.tsx     # user, login, register, logout
├── hooks/                  # бизнес-логика (feature-level)
│   ├── useAssets.ts        # загрузка списка ассетов
│   ├── useUpload.ts        # логика загрузки файлов
│   └── useSimilarSearch.ts # логика поиска похожих
├── layouts/                # макеты страниц
│   └── MainLayout.tsx      # AppShell + Header + Outlet
├── pages/                  # 5 страниц-экранов
│   ├── AuthPage.tsx        # /auth — вход + регистрация
│   ├── LibraryPage.tsx     # /library — грид + панель деталей
│   ├── UploadPage.tsx      # /upload — загрузка файлов
│   ├── ProfilePage.tsx     # /profile — профиль пользователя
│   └── SettingsPage.tsx    # /settings — настройки, тема, смена пароля
├── types/                  # TypeScript-типы (зеркало Pydantic)
│   ├── index.ts            # реэкспорт
│   ├── api.ts              # ApiError, Paginated
│   ├── assets.ts           # Asset, SimilarAsset
│   ├── user.ts             # User
│   └── upload.ts           # UploadItem, UploadStatus
├── App.tsx                 # роутинг (BrowserRouter + Routes)
├── App.css                 # стили приложения (не используются, для совместимости)
├── main.tsx                # точка входа (MantineProvider + AuthProvider)
├── index.css               # глобальные стили
└── vite-env.d.ts           # типы Vite (import.meta.env, .svg)
```

### Соответствие слоям FSD

| Слой FSD | В проекте | Назначение |
|---|---|---|
| **app** | `main.tsx`, `App.tsx` | Настройка приложения: провайдеры, роутинг |
| **pages** | `pages/` | Экраны, привязанные к URL |
| **features** | `hooks/`, `api/` | Пользовательские действия (login, upload, search) |
| **entities** | `types/` | Бизнес-сущности (Asset, User) |
| **shared** | `components/`, `layouts/` | Переиспользуемые UI-компоненты, макеты |

**Принцип:** каждый слой знает **только про свой уровень**. Страницы **собирают** компоненты, хуки **дают данные**, API **ходит на бэк**, типы **описывают форму данных**.

## Страницы

| URL | Компонент | Назначение |
|---|---|---|
| `/auth` | `AuthPage` | Вход + регистрация (табы) |
| `/library` | `LibraryPage` | Грид ассетов + панель деталей + поиск похожих |
| `/upload` | `UploadPage` | Drag-and-drop загрузка с прогрессом |
| `/profile` | `ProfilePage` | Профиль, статистика пользователя |
| `/settings` | `SettingsPage` | Настройки, тёмная тема, смена пароля |

## Интерактивные элементы и состояние

### Управление состоянием

- **Глобальное** — `AuthContext` (текущий пользователь, login/logout).
- **Локальное** — `useState` в компонентах (выбор ассета, форма).
- **Данные** — кастомные хуки (`useAssets`, `useUpload`, `useSimilarSearch`).

### Формы и валидация

- **AuthPage** — email (валидация формата), пароль (≥6 символов), повтор пароля.
- **UploadPage** — валидация MIME-типа и размера (<10 МБ) на клиенте.
- **SettingsPage** — валидация смены пароля, обработка 400 от бэка.

### Состояния интерфейса

Для **всех** запросов к API обрабатываются:

- **Loading** — `<Loader>` или `<Skeleton>`.
- **Error** — `<Alert color="red">` с сообщением.
- **Empty** — «Библиотека пуста» / «Ничего не найдено».
- **Success** — `<Alert color="green">` для действий (смена пароля).

### Реакция на действия пользователя

- **Клик по карточке** → выделение + загрузка деталей.
- **Drag-and-drop** → появление в списке загрузки.
- **Отправка формы** → спиннер на кнопке.
- **Переключение темы** → мгновенное применение + сохранение в `localStorage`.

### Типизация

- **Строгий режим** TypeScript (`strict: true`).
- **Все API-ответы** типизированы в `types/`.
- **Типы — зеркало** Pydantic-схем бэкенда (snake_case).
- **Пропсы компонентов** типизированы через `type Props = {...}`.

## Анимации и переходы

- **Hover-эффекты** на карточках (`Card` с `shadow="md"`).
- **Skeleton-заглушки** при загрузке библиотеки.
- **Transition** (Mantine) на появление контента.
- **SegmentedControl, Tabs** — встроенные плавные переходы.
- **Меню пользователя** — анимация открытия (Mantine).

## Запуск frontend

```bash
cd frontend
npm install
npm run dev
```

Приложение — на `http://localhost:5173`.
**Требует** запущенного backend на `http://localhost:8000`.

### Скриншоты работы (лабораторная №3)

#### Skeleton-заглушки при загрузке библиотеки
![Skeleton Loading](docs/screenshots/lab3/01-skeleton-loading.png)

#### Библиотека ассетов с реальными данными
![Library](docs/screenshots/lab3/02-library.png)

#### Панель похожих ассетов (top-N по косинусному расстоянию)
![Similar](docs/screenshots/lab3/03-similar.png)

#### Загрузка файлов через drag-and-drop
![Upload](docs/screenshots/lab3/04-upload.png)

#### Страница входа
![Auth Login](docs/screenshots/lab3/05-auth-login.png)

#### Страница регистрации
![Auth Register](docs/screenshots/lab3/06-auth-register.png)

#### Настройки — тёмная тема
![Settings Dark](docs/screenshots/lab3/07-settings-dark.png)

#### Смена пароля — успешное выполнение
![Password Change Success](docs/screenshots/lab3/08-password-change-success.png)

#### Смена пароля — ошибка валидации
![Password Change Error](docs/screenshots/lab3/09-password-change-error.png)