# wt-lab9-9nodejs-kleshchenok

Лабораторная работа № 9 «Web-технологии» — основы Node.js и публикация на Render.
Предметная область: прокат автомобилей. HTTP-сервер на `http.createServer()` без Express.

- GitHub: https://github.com/<логин>/wt-lab9-9nodejs-kleshchenok
- Render: https://<имя-приложения>.onrender.com

## Запуск

```bash
npm start            # http://localhost:3000
```

## Маршруты

| Метод | URL | Ответ |
|-------|-----|-------|
| GET | `/` | текст «Сервер Node.js работает!» |
| GET | `/api/cars` (также `/api/products`) | JSON — содержимое `data/cars.json`, код 200 |
| любой другой | любой другой | JSON `{"error":"Маршрут не найден"}`, код 404 |
