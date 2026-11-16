// ───────────── Подключение модулей ─────────────
const http = require("http");   // встроенный модуль: HTTP-сервер
const fs = require("fs");       // встроенный модуль: работа с файлами
const path = require("path");   // встроенный модуль: пути к файлам
const { getCarCount } = require("./utils");   // собственный модуль

// ───────────── Чтение данных из JSON-файла ─────────────
const filePath = path.join(__dirname, "data", "cars.json");
const text = fs.readFileSync(filePath, "utf-8");   // содержимое файла — строка
const cars = JSON.parse(text);                     // строка JSON -> массив JavaScript

console.log("Node.js работает!");
console.log("Количество автомобилей:", getCarCount(cars));

// ───────────── Вспомогательная функция: ответ в формате JSON ─────────────
function sendJson(res, statusCode, body) {
    res.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(body));                 // массив/объект JavaScript -> строка
    JSON
}
// ───────────── HTTP-сервер без Express ─────────────
const server = http.createServer((req, res) => {
    // req.url может содержать параметры (?a=1); для сравнения берём только путь
    const { pathname } = new URL(req.url, "http://localhost");

    // GET /  — проверка, что сервер работает
    if (req.method === "GET" && pathname === "/") {
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Сервер Node.js работает!");
        return;
    }

    // GET /api/cars  — список автомобилей из cars.json
    if (req.method === "GET" && (pathname === "/api/cars" || pathname ===
        "/api/products")) {
        sendJson(res, 200, cars);
        return;
    }

    // Любой другой маршрут — 404
    sendJson(res, 404, { error: "Маршрут не найден" });
});

// ───────────── Запуск сервера ─────────────
const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", () => {
    console.log(`Сервер запущен на порту ${port}`);
});
