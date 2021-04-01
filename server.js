const path = require("path");
const express = require("express");
const { MongoClient } = require("mongodb");

const server = express();
server.use(express.static(path.join(__dirname, "build")));
server.use(express.json());
const port = Number(process.env.PORT || 3000);
const mongoDbUri = process.env.MONGODB_URI;

server.get("/api/answers", async function (req, res) {
    const client = new MongoClient(mongoDbUri, { useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db("supi_orientak");
        const collection = database.collection("answers");

        const answers = await collection.find().toArray();

        return res.json(answers);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
});

server.post("/api/answers", async function (req, res) {
    const client = new MongoClient(mongoDbUri, { useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db("supi_orientak");
        const collection = database.collection("answers");

        const dbResponse = await collection.insertOne(req.body);

        return res.status(201).json(dbResponse.ops[0]);
    } catch (err) {
        console.log(err);
    } finally {
        await client.close();
    }
});

server.listen(port, () => {
    console.log("Server is running");
});
