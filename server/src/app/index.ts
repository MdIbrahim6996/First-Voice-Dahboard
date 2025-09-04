import express, { Application, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import cluster from "cluster";
import os from "os";
import router from "./routes";
import pagesRouter from "./routes/user/pages.route";
import { errorHandler, notFound } from "./middlewares/errorHandler";
import { isUserAuth } from "./middlewares/authMiddleware";
import { prisma } from "./lib/prismaClient";
import { getDailyLeadCount } from "./controllers/user/dashboard.controller";
import { getUserAllAttendance } from "./controllers/user/attendance.controller";
import { getUserInfo } from "./controllers/user/profile.controller";
import { getAllNotificationOfUser } from "./controllers/user/notification.controller";
import { pusher } from "./lib/pusher";
import { createLead, getUserLeads } from "./controllers/user/leads.controller";
import {
  CLIENT_URL,
  monthNames,
  quote,
  quotesArray,
} from "./utils/appContants";
import { loginFunction } from "./controllers/auth.controller";

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
app.use(compression());

// VIEWS
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src/app/views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

// NO CACHE, FRESH PAGE FETCHING ALWAYS FOR EJS ROUTES
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

// ROUTING FOR REACT APP
app.use("/app", express.static(path.join(path.resolve(), "../client", "dist")));
app.get("/app/{*any}", (req, res) => {
  res.sendFile(path.resolve(path.resolve(), "../client", "dist", "index.html"));
});

//STATIC FILES
app.use(express.static(path.join(path.resolve(), "src/app/public")));
app.use("/js", express.static(path.join(path.resolve(), "src/app/public/js")));
app.use(
  "/css",
  express.static(path.join(path.resolve(), "src/app/public/css"))
);

// API ROUTER
app.use("/api/v1", router);

// GLOBAL VARIABLES FOR EJS
app.locals.pusherKey = process.env.PUSHER_KEY;
app.locals.pusherCluster = process.env.PUSHER_CLUSTER;

app.locals.currentMonth = monthNames[new Date().getMonth()];

// ROUTING FOR USERS STARTS
app.get("/login", (req, res: Response) => {
  const { token } = req.cookies;
  if (token) {
    return res.redirect("/user/profile");
  } else res.render("pages/login", { layout: false, error: null });
});

app.post("/login", loginFunction);
app.get("/logout", (req, res: Response) => {
  res.clearCookie("token");
  res.redirect("/login");
});

// SENDING GLOBAL VARIABLES TO SIDEBAR EJS
app.use(isUserAuth, async (req, res, next) => {
  const notifs = await prisma.notification.count({
    where: { userId: Number(req.user?.id) },
  });
  res.locals.user = req.user;
  res.locals.notifCount = notifs;
  next();
});

app.get("", isUserAuth, (req, res: Response) => {
  if (req.user?.role === "superadmin") {
    res.redirect(CLIENT_URL);
  }
  res.redirect("/user/profile");
});
app.get("/user", isUserAuth, (_, res: Response) =>
  res.redirect("/user/profile")
);
app.get("/user/dashboard", isUserAuth, getDailyLeadCount);
app.get("/user/attendance", isUserAuth, getUserAllAttendance);
// app.get("/user/holiday", isUserAuth, (_, res: Response) =>
//   res.render("pages/holiday", { currentPath: "/user/holiday" })
// );
app.get("/user/leads", isUserAuth, getUserLeads);

app.get("/user/add-lead", isUserAuth, async (_, res: Response) => {
  const process = await prisma.process.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
  });
  const plan = await prisma.plan.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, processId: true },
  });
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    where: { role: "closer" },
    select: { id: true, name: true },
  });

  res.render("pages/add-lead", {
    currentPath: "/user/add-lead",
    process,
    plan,
    users,
    quote: quote,
  });
});
app.post("/user/add-lead", isUserAuth, createLead);
app.get("/user/notification", isUserAuth, getAllNotificationOfUser);

app.get("/user/profile", isUserAuth, getUserInfo);
app.use("/", isUserAuth, pagesRouter);

// ROUTING FOR USERS ENDS

// Serve front-end app for all unmatched routes
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(path.resolve(), "../client", "dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(
      path.resolve(path.resolve(), "../client", "dist", "index.html")
    );
  });
}
app.use((req, res, next) => {
  if (req.path.startsWith("/app")) return next(); // React handles routing from here.
  res.status(404).render("errors/404", { url: req.originalUrl, layout: false });
});

//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = 4000;
// app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));

//INITIATION OF CLUSTER SERVER
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
