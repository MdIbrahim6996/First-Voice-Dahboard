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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var routes_1 = __importDefault(require("./routes"));
var pages_route_1 = __importDefault(require("./routes/user/pages.route"));
var errorHandler_1 = require("./middlewares/errorHandler");
var path_1 = __importDefault(require("path"));
var express_ejs_layouts_1 = __importDefault(require("express-ejs-layouts"));
var cluster_1 = __importDefault(require("cluster"));
var os_1 = __importDefault(require("os"));
var authMiddleware_1 = require("./middlewares/authMiddleware");
var prismaClient_1 = require("./lib/prismaClient");
var token_1 = require("./utils/token");
var bcrypt_1 = __importDefault(require("bcrypt"));
var dashboard_controller_1 = require("./controllers/user/dashboard.controller");
var attendance_controller_1 = require("./controllers/user/attendance.controller");
var profile_controller_1 = require("./controllers/user/profile.controller");
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
// VIEWS
app.set("view engine", "ejs");
app.set("views", path_1.default.join(path_1.default.resolve(), "src/app/views"));
app.use(express_ejs_layouts_1.default);
app.set("layout", "layouts/main");
//STATIC FILES
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "src/app/public")));
app.use("/js", express_1.default.static(path_1.default.join(path_1.default.resolve(), "src/app/public/js")));
app.use("/css", express_1.default.static(path_1.default.join(path_1.default.resolve(), "src/app/public/css")));
// ROUTES
// app.get("/user/{*any}", (_, res: Response) => res.send("pages not found"));
// app.get("/api/v1/health-check", (_, res: Response) =>
//   res.send({ message: "ok" })
// );
var loginFunction = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, existingUser, matchedPassword, token, password_1, userData, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, prismaClient_1.prisma.user.findFirst({
                        where: { email: email },
                    })];
            case 2:
                existingUser = _b.sent();
                if (!existingUser) {
                    throw new Error("User Does not Exist.");
                }
                if (existingUser === null || existingUser === void 0 ? void 0 : existingUser.isBlocked) {
                    res.status(401);
                    throw new Error("You Have Been Blocked By Admin.");
                }
                return [4 /*yield*/, bcrypt_1.default.compare(password, existingUser.password)];
            case 3:
                matchedPassword = _b.sent();
                if (matchedPassword) {
                    token = (0, token_1.generateAuthToken)(String(existingUser === null || existingUser === void 0 ? void 0 : existingUser.id), existingUser.role);
                    console.log("Generated Token:", token); // Debugging line
                    if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.role) === "user") {
                        return [2 /*return*/, res
                                .cookie("token", token, {
                                httpOnly: true,
                                secure: false,
                                maxAge: 12 * 60 * 60 * 1000,
                            })
                                .redirect(303, "/user/dashboard")];
                    }
                    password_1 = existingUser.password, userData = __rest(existingUser, ["password"]);
                    // if (existingUser?.role === "user") {
                    //     res.json({
                    //         success: true,
                    //         redirectUrl: "http://localhost:4000/user",
                    //     });
                    // }
                    return [2 /*return*/, res
                            .cookie("token", token, {
                            httpOnly: true,
                            secure: true,
                            maxAge: 12 * 60 * 60 * 1000,
                        })
                            .redirect("http://localhost:5173/superadmin/dashboard")];
                }
                else {
                    throw new Error("Invalid Credentials.");
                }
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                next(error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
app.get("/login", function (req, res) {
    var token = req.cookies.token;
    console.log("Token from cookie login:", token); // Debugging line
    if (token) {
        return res.redirect("/user/dashboard");
    }
    else
        res.render("pages/login", { layout: false });
});
app.post("/login", loginFunction);
app.get("/logout", function (req, res) {
    res.clearCookie("token");
    res.redirect("/login");
});
app.get("", authMiddleware_1.isUserAuth, function (_, res) { return res.redirect("/user/dashboard"); });
app.get("/user", authMiddleware_1.isUserAuth, function (_, res) {
    return res.redirect("/user/dashboard");
});
app.get("/user/dashboard", authMiddleware_1.isUserAuth, dashboard_controller_1.getDailyLeadCount);
app.get("/user/attendance", authMiddleware_1.isUserAuth, attendance_controller_1.getUserAllAttendance);
app.get("/user/holiday", authMiddleware_1.isUserAuth, function (_, res) {
    return res.render("pages/holiday", { currentPath: "/user/holiday" });
});
app.get("/user/leads", authMiddleware_1.isUserAuth, function (_, res) {
    return res.render("pages/leads", { currentPath: "/user/leads" });
});
app.get("/user/add-lead", authMiddleware_1.isUserAuth, function (_, res) {
    return res.render("pages/add-lead", { currentPath: "/user/add-lead" });
});
app.get("/user/notification", authMiddleware_1.isUserAuth, function (_, res) {
    return res.render("pages/notification", { currentPath: "/user/notification" });
});
app.get("/user/profile", authMiddleware_1.isUserAuth, profile_controller_1.getUserInfo);
app.use("/", pages_route_1.default);
app.use("/api/v1", routes_1.default);
// Serve front-end app for all unmatched routes
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "../client", "dist")));
    app.get("/{*any}", function (req, res) {
        res.sendFile(path_1.default.resolve(path_1.default.resolve(), "../client", "dist", "index.html"));
    });
}
// Serve front-end app for all unmatched routes
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "../client", "dist")));
app.get("/app", function (req, res) {
    res.sendFile(path_1.default.resolve(path_1.default.resolve(), "../client", "dist", "index.html"));
});
app.use(function (req, res, next) {
    // Only handle 404s for non-React routes
    if (req.path.startsWith("/app")) {
        return next(); // let React handle it
    }
    res.status(404).render("errors/404", {
        url: req.originalUrl,
        layout: false, // optional: show requested URL
    });
});
//ERROR HANDLER
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
var PORT = 4000;
// app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
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
// async function dropTable() {
//     await prisma.$executeRaw`DROP TABLE IF EXISTS leadCount;`;
//     // Or with IF EXISTS to prevent errors if the table doesn't exist:
//     // await prisma.$executeRaw`DROP TABLE IF EXISTS User;`;
// }
// dropTable();
