import express, { Application, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routes";
import { errorHandler, notFound } from "./middlewares/errorHandler";
import path from "path";

import cluster from "cluster";
import os from "os";
const numCPUs = os.cpus().length;

const app: Application = express();

//MIDDLEWARES
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://first-voice-dahboard.onrender.com",
        ],
        credentials: true,
        optionsSuccessStatus: 200,
    })
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());

//ROUTES
app.get("/api/v1/health-check", (_, res: Response) =>
    res.send({ message: "ok" })
);
app.use("/api/v1", router);

if (process.env.NODE_ENV === "production") {
    // Serve front-end app for all unmatched routes
    app.use(express.static(path.join(path.resolve(), "../client", "dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(
            path.resolve(path.resolve(), "../client", "dist", "index.html")
        );
    });
}

app.use(express.static(path.join(path.resolve(), "../client", "dist")));

app.get("/{*any}", (req, res) => {
    res.sendFile(
        path.resolve(path.resolve(), "../client", "dist", "index.html")
    );
});

//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = 4000;
// app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));

if (numCPUs > 1) {
    if (cluster.isPrimary) {
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on("exit", function (worker: any) {
            console.log("Worker", worker.id, " has exited.");
        });
    } else {
        app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
    }
} else {
    app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
}

// async function dropTable() {
//     await prisma.$executeRaw`DROP TABLE IF EXISTS leadCount;`;
//     // Or with IF EXISTS to prevent errors if the table doesn't exist:
//     // await prisma.$executeRaw`DROP TABLE IF EXISTS User;`;
// }

// dropTable();
