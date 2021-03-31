const fs = require("fs");
const path = require("path");
const jsonServer = require("json-server");
const dbFilePath = path.join(__dirname, "data/db.json");
if (!fs.existsSync(dbFilePath)) {
    fs.writeFileSync(dbFilePath, JSON.stringify({ answers: [] }));
}
const server = jsonServer.create();
const router = jsonServer.router(dbFilePath);
const middleware = jsonServer.defaults({
    static: path.join(__dirname, "build"),
});
const port = Number(process.env.PORT || 3000);

server.use(middleware);
server.use((req, res, next) => {
    if (req.method !== "GET" && req.method !== "POST") {
        res.sendStatus(405);
    } else {
        next();
    }
});
server.use("/api", router);
server.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});
server.listen(port, () => {
    console.log("JSON Server is running");
});
