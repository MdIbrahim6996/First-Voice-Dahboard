"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var compression_1 = __importDefault(require("compression"));
var path_1 = __importDefault(require("path"));
var express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
var cluster_1 = __importDefault(require("cluster"));
var os_1 = __importDefault(require("os"));
var routes_1 = __importDefault(require("./routes"));
var pages_route_1 = __importDefault(require("./routes/user/pages.route"));
var errorHandler_1 = require("./middlewares/errorHandler");
var authMiddleware_1 = require("./middlewares/authMiddleware");
var prismaClient_1 = require("./lib/prismaClient");
var dashboard_controller_1 = require("./controllers/user/dashboard.controller");
var attendance_controller_1 = require("./controllers/user/attendance.controller");
var profile_controller_1 = require("./controllers/user/profile.controller");
var notification_controller_1 = require("./controllers/user/notification.controller");
var leads_controller_1 = require("./controllers/user/leads.controller");
var appContants_1 = require("./utils/appContants");
var auth_controller_1 = require("./controllers/auth.controller");
var numCPUs = os_1.default.cpus().length;
var app = (0, express_1.default)();
//MIDDLEWARES
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://first-voice-dahboard.onrender.com",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, compression_1.default)());
// VIEWS
app.set("view engine", "ejs");
app.set("views", path_1.default.join(path_1.default.resolve(), "src/app/views"));
app.use(express_ejs_layouts_1.default);
app.set("layout", "layouts/main");
// NO CACHE, FRESH PAGE FETCHING ALWAYS FOR EJS ROUTES
app.use(function (req, res, next) {
    res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
    next();
});
// ROUTING FOR REACT APP
app.use("/app", express_1.default.static(path_1.default.join(path_1.default.resolve(), "../client", "dist")));
app.get("/app/{*any}", function (req, res) {
    res.sendFile(path_1.default.resolve(path_1.default.resolve(), "../client", "dist", "index.html"));
});
//STATIC FILES
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "src/app/public")));
app.use("/js", express_1.default.static(path_1.default.join(path_1.default.resolve(), "src/app/public/js")));
app.use("/css", express_1.default.static(path_1.default.join(path_1.default.resolve(), "src/app/public/css")));
// API ROUTER
app.use("/api/v1", routes_1.default);
// GLOBAL VARIABLES FOR EJS
app.locals.pusherKey = process.env.PUSHER_KEY;
app.locals.pusherCluster = process.env.PUSHER_CLUSTER;
app.locals.currentMonth = appContants_1.monthNames[new Date().getMonth()];
// ROUTING FOR USERS STARTS
app.get("/login", function (req, res) {
    var token = req.cookies.token;
    if (token) {
        return res.redirect("/user/profile");
    }
    else
        res.render("pages/login", { layout: false, error: null });
});
app.post("/login", auth_controller_1.loginFunction);
app.get("/logout", function (req, res) {
    res.clearCookie("token");
    res.redirect("/login");
});
// SENDING GLOBAL VARIABLES TO SIDEBAR EJS
app.use(authMiddleware_1.isUserAuth, function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var notifs;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, prismaClient_1.prisma.notification.count({
                    where: { userId: Number((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) },
                })];
            case 1:
                notifs = _b.sent();
                res.locals.user = req.user;
                res.locals.notifCount = notifs;
                next();
                return [2 /*return*/];
        }
    });
}); });
app.get("", authMiddleware_1.isUserAuth, function (req, res) {
    var _a;
    if (((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) === "superadmin") {
        res.redirect(appContants_1.CLIENT_URL);
    }
    res.redirect("/user/profile");
});
app.get("/user", authMiddleware_1.isUserAuth, function (_, res) {
    return res.redirect("/user/profile");
});
app.get("/user/dashboard", authMiddleware_1.isUserAuth, dashboard_controller_1.getDailyLeadCount);
app.get("/user/attendance", authMiddleware_1.isUserAuth, attendance_controller_1.getUserAllAttendance);
// app.get("/user/holiday", isUserAuth, (_, res: Response) =>
//   res.render("pages/holiday", { currentPath: "/user/holiday" })
// );
app.get("/user/leads", authMiddleware_1.isUserAuth, leads_controller_1.getUserLeads);
app.get("/user/add-lead", authMiddleware_1.isUserAuth, function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    var process, plan, users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prismaClient_1.prisma.process.findMany({
                    orderBy: { createdAt: "desc" },
                    select: { id: true, name: true },
                })];
            case 1:
                process = _a.sent();
                return [4 /*yield*/, prismaClient_1.prisma.plan.findMany({
                        orderBy: { createdAt: "desc" },
                        select: { id: true, name: true, processId: true },
                    })];
            case 2:
                plan = _a.sent();
                return [4 /*yield*/, prismaClient_1.prisma.user.findMany({
                        orderBy: { createdAt: "desc" },
                        where: { role: "closer" },
                        select: { id: true, name: true },
                    })];
            case 3:
                users = _a.sent();
                res.render("pages/add-lead", {
                    currentPath: "/user/add-lead",
                    process: process,
                    plan: plan,
                    users: users,
                    quote: (0, appContants_1.returnRandomQuotes)(),
                });
                return [2 /*return*/];
        }
    });
}); });
app.post("/user/add-lead", authMiddleware_1.isUserAuth, leads_controller_1.createLead);
app.get("/user/notification", authMiddleware_1.isUserAuth, notification_controller_1.getAllNotificationOfUser);
app.get("/user/profile", authMiddleware_1.isUserAuth, profile_controller_1.getUserInfo);
app.use("/", authMiddleware_1.isUserAuth, pages_route_1.default);
// ROUTING FOR USERS ENDS
// Serve front-end app for all unmatched routes
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "../client", "dist")));
    app.get("/{*any}", function (req, res) {
        res.sendFile(path_1.default.resolve(path_1.default.resolve(), "../client", "dist", "index.html"));
    });
}
app.use(function (req, res, next) {
    if (req.path.startsWith("/app"))
        return next(); // React handles routing from here.
    res.status(404).render("errors/404", { url: req.originalUrl, layout: false });
});
//ERROR HANDLER
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
var PORT = 4000;
// app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
console.log(process.env.NODE_ENV);
//INITIATION OF CLUSTER SERVER
if (numCPUs > 1) {
    if (cluster_1.default.isPrimary) {
        for (var i = 0; i < numCPUs; i++) {
            cluster_1.default.fork();
        }
        cluster_1.default.on("exit", function (worker) {
            console.log("Worker", worker.id, " has exited.");
        });
    }
    else {
        app.listen(PORT, function () { return console.log("Listening at PORT ".concat(PORT)); });
    }
}
else {
    app.listen(PORT, function () { return console.log("Listening at PORT ".concat(PORT)); });
}
