import express, { Application, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routes";
import { errorHandler, notFound } from "./middlewares/errorHandler";
import path from "path";
import expressLayouts from "express-ejs-layouts";

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
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
// VIEWS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/app/views"));
app.set("layout", "layouts/main");

//STATIC FILES
app.use(express.static(path.join(path.resolve(), "src/app/public")));
app.use("/js", express.static(path.join(path.resolve(), "src/app/public/js")));
app.use(
    "/css",
    express.static(path.join(path.resolve(), "src/app/public/css"))
);
// console.log(path.join(path.resolve(), "src/app/views/pages/scss"));

//ROUTES
app.get("/user", (_, res: Response) => res.redirect("/user/dashboard"));
app.get("/user/dashboard", (_, res: Response) =>
    res.render("pages/dashboard", { currentPath: "/user/dashboard" })
);
app.get("/user/attendance", (_, res: Response) =>
    res.render("pages/attendance", { currentPath: "/user/attendance" })
);
app.get("/user/holiday", (_, res: Response) =>
    res.render("pages/holiday", { currentPath: "/user/holiday" })
);
app.get("/user/notification", (_, res: Response) =>
    res.render("pages/notification", { currentPath: "/user/notification" })
);
app.get("/user/profile", (_, res: Response) =>
    res.render("pages/profile", { currentPath: "/user/profile" })
);
// app.get("/user/{*any}", (_, res: Response) => res.send("pages not found"));
app.get("/api/v1/health-check", (_, res: Response) =>
    res.send({ message: "ok" })
);
app.use("/api/v1", router);

// Serve front-end app for all unmatched routes
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(path.resolve(), "../client", "dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(
            path.resolve(path.resolve(), "../client", "dist", "index.html")
        );
    });
}

// Serve front-end app for all unmatched routes
app.use(express.static(path.join(path.resolve(), "../client", "dist")));
app.get("/app", (req, res) => {
    res.sendFile(
        path.resolve(path.resolve(), "../client", "dist", "index.html")
    );
});

app.use((req, res, next) => {
    // Only handle 404s for non-React routes
    if (req.path.startsWith("/app")) {
        return next(); // let React handle it
    }

    res.status(404).render("pages/404", {
        url: req.originalUrl,
        layout: false, // optional: show requested URL
    });
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
