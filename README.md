# Railway Ticket Booking

[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-2ea44f?style=flat-square)](https://madmaxim22.github.io/railway-ticket-booking/)

Веб-приложение для поиска и бронирования железнодорожных билетов (дипломный проект). Клиент на **React 19**, **TypeScript**, **Vite**, **Redux Toolkit** и **RTK Query**; данные приходят с учебного API Netology.

**Демо:** [https://madmaxim22.github.io/railway-ticket-booking/](https://madmaxim22.github.io/railway-ticket-booking/)

## Требования

- [Node.js](https://nodejs.org/) 20 LTS или новее
- npm 10+

## Быстрый старт

```bash
git clone https://github.com/madmaxim22/railway-ticket-booking.git
cd railway-ticket-booking
npm ci
cp .env.example .env
npm run dev
```

Приложение откроется на [http://localhost:5173/railway-ticket-booking/](http://localhost:5173/railway-ticket-booking/) (в `vite.config.ts` и роутере задан `base` `/railway-ticket-booking/` для GitHub Pages).

## Переменные окружения

Скопируйте `.env.example` в `.env` и при необходимости измените значение:

| Переменная | Описание |
|------------|----------|
| `VITE_API_BASE_URL` | Базовый URL REST API (по умолчанию учебный бэкенд Netology) |

Пример:

```env
VITE_API_BASE_URL=https://students.netoservices.ru/fe-diplom
```

Переменные с префиксом `VITE_` подставляются в сборку на этапе `npm run build` / `npm run dev`.

## Сценарий бронирования

1. **Главная** (`/`) — промо-страница; поиск можно начать из шапки или перейти к бронированию.
2. **Поиск и выбор поезда** (`/booking/trains`) — укажите города отправления/прибытия, даты, пассажиров; примените фильтры (цена, время, тип вагона). Выберите поезд(а) и тариф.
3. **Выбор мест** (`/booking/seats`) — схема вагона, места и услуги для каждого сегмента маршрута.
4. **Пассажиры** (`/booking/passengers`) — данные пассажиров по количеству билетов.
5. **Оплата** (`/booking/payment`) — способ оплаты и контактные данные.
6. **Проверка** (`/booking/confirmation`) — итог заказа перед отправкой.
7. **Успех** (`/booking/success`) — подтверждение после создания заказа через API.

Параметры поиска синхронизируются с URL; состояние бронирования сохраняется в `sessionStorage`, чтобы можно было обновить страницу на промежуточных шагах. Хлебные крошки и guard шагов не дают перейти вперёд без заполненных данных предыдущих этапов.

## Скрипты npm

| Команда | Назначение |
|---------|------------|
| `npm run dev` | Dev-сервер Vite с HMR |
| `npm run build` | Проверка TypeScript (`tsc -b`) и production-сборка |
| `npm run preview` | Локальный просмотр собранного `dist/` |
| `npm run lint` | ESLint по всему проекту |
| `npm run test` | Vitest в watch-режиме |
| `npm run test:run` | Однократный прогон тестов (как в CI) |

## CI и деплой

На каждый push и pull request в `main` / `master` запускается [CI](.github/workflows/ci.yml):

- `npm run lint`
- `npm run test:run`
- `npm run build` (с `VITE_API_BASE_URL` из `.env.example`)

После успешной проверки при push в `main` / `master` workflow [Deploy GitHub Pages](.github/workflows/pages.yml) публикует `dist/` на GitHub Pages.

**Один раз в настройках репозитория:** Settings → Pages → Build and deployment → Source: **GitHub Actions**.

## Стек

- React 19, React Router 7
- Redux Toolkit, RTK Query
- Vite 8, Vitest, Testing Library
- ESLint 9 (flat config)

## Лицензия

Учебный проект; репозиторий приватный по условиям диплома, если иное не указано владельцем.
