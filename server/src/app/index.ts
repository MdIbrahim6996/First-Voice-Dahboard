import express, { Application, NextFunction, Response, Request } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import router from "./routes";
import pagesRouter from "./routes/user/pages.route";
import { errorHandler, notFound } from "./middlewares/errorHandler";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import cluster from "cluster";
import os from "os";
import { isUserAuth } from "./middlewares/authMiddleware";
import { prisma } from "./lib/prismaClient";
import { generateAuthToken } from "./utils/token";
import bcrypt from "bcrypt";
import { getDailyLeadCount } from "./controllers/user/dashboard.controller";
import { getUserAllAttendance } from "./controllers/user/attendance.controller";
import { getUserInfo } from "./controllers/user/profile.controller";
import { getAllNotificationOfUser } from "./controllers/user/notification.controller";
import { pusher } from "./lib/pusher";
import { createLead, getUserLeads } from "./controllers/user/leads.controller";

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

app.use((req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  next();
});

// app.use(
//   "/assets",
//   express.static(path.join(path.resolve(), "../client", "dist", "assets"))
// );
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

// ROUTES
// app.get("/user/{*any}", (_, res: Response) => res.send("pages not found"));
// app.get("/api/v1/health-check", (_, res: Response) =>
//   res.send({ message: "ok" })
// );

app.locals.pusherKey = process.env.PUSHER_KEY;
app.locals.pusherCluster = process.env.PUSHER_CLUSTER;

const loginFunction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email },
    });
    if (!existingUser) {
      throw new Error("User Does not Exist.");
    }

    if (existingUser?.isBlocked) {
      res.status(401);
      throw new Error("You Have Been Blocked By Admin.");
    }
    const matchedPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (matchedPassword) {
      const token = generateAuthToken(
        String(existingUser?.id),
        existingUser.role
      );
      if (existingUser?.role === "user") {
        return res
          .cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 12 * 60 * 60 * 1000,
          })
          .redirect(303, "/user/dashboard");
      }

      const { password, ...userData } = existingUser;

      return res
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          maxAge: 12 * 60 * 60 * 1000,
        })
        .redirect("http://localhost:4000/app/superadmin/dashboard");
    } else {
      throw new Error("Invalid Credentials.");
    }
  } catch (error: any) {
    console.log(error);
    res.render("pages/login", { layout: false, error: error.message });
    // next(error);
  }
};

app.post("/notify", (req, res) => {
  const notification = req.body.notification || "Default notification";
  console.log("Notification received:", notification); // Debugging line
  pusher.trigger("notifications", "new-notification", { text: notification });
  res.json({ status: "ok" });
});

app.get("/login", (req, res: Response) => {
  const { token } = req.cookies;
  console.log("Token from cookie login:", token); // Debugging line
  if (token) {
    return res.redirect("/user/dashboard");
  } else res.render("pages/login", { layout: false, error: null });
});

app.post("/login", loginFunction);
app.get("/logout", (req, res: Response) => {
  res.clearCookie("token");
  res.redirect("/login");
});

app.use(isUserAuth, async (req, res, next) => {
  const notifs = await prisma.notification.count({
    where: { userId: Number(req.user?.id) },
  });
  res.locals.user = req.user;
  res.locals.notifCount = notifs;
  next();
});
// app.get("", isUserAuth, (_, res: Response) => res.redirect("/user/dashboard"));
app.get("/user", isUserAuth, (_, res: Response) =>
  res.redirect("/user/dashboard")
);
app.get("/user/dashboard", isUserAuth, getDailyLeadCount);
app.get("/user/attendance", isUserAuth, getUserAllAttendance);
app.get("/user/holiday", isUserAuth, (_, res: Response) =>
  res.render("pages/holiday", { currentPath: "/user/holiday" })
);
app.get("/user/leads", isUserAuth, getUserLeads);

app.get("/user/add-lead", isUserAuth, async (_, res: Response) => {
  const process = await prisma.process.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
  });
  const plan = await prisma.plan.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true },
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
  });
});
app.post("/user/add-lead", isUserAuth, createLead);
app.get("/user/notification", isUserAuth, getAllNotificationOfUser);

app.get("/user/profile", isUserAuth, getUserInfo);
app.use("/", isUserAuth, pagesRouter);
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
app.use((req, res, next) => {
  console.log("======", req.path);
  if (req.path.startsWith("/app")) return next(); // let React handle
  res.status(404).render("errors/404", { url: req.originalUrl, layout: false });
});
// Serve front-end app for all unmatched routes
app.use(express.static(path.join(path.resolve(), "../client", "dist")));
app.get("/app/{*any}", (req, res) => {
  res.sendFile(path.resolve(path.resolve(), "../client", "dist", "index.html"));
});

// app.use((req, res, next) => {
//   // Only handle 404s for non-React routes
//   if (req.path.startsWith("/app")) {
//     console.log("==============", req.path);
//     app.use(
//       "/app",
//       express.static(path.join(path.resolve(), "../client", "dist"))
//     );
//     app.get("/app", (req, res) => {
//       res.sendFile(
//         path.resolve(path.resolve(), "../client", "dist", "index.html")
//       );
//     });
//     return next(); // let React handle it
//   }

//   res.status(404).render("errors/404", {
//     url: req.originalUrl,
//     layout: false,
//   });
// });

//ERROR HANDLER
app.use(notFound);
app.use(errorHandler);

const PORT = 4000;
app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));

// if (numCPUs > 1) {
//   if (cluster.isPrimary) {
//     for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//     }

//     cluster.on("exit", function (worker: any) {
//       console.log("Worker", worker.id, " has exited.");
//     });
//   } else {
//     app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
//   }
// } else {
//   app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
// }
