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

---

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

### Скриншоты работы (лаба №2)

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
