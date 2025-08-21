"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var routes_1 = __importDefault(require("./routes"));
var errorHandler_1 = require("./middlewares/errorHandler");
var path_1 = __importDefault(require("path"));
var os_1 = __importDefault(require("os"));
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
//ROUTES
app.get("/api/v1/health-check", function (_, res) {
    return res.send({ message: "ok" });
});
app.use("/api/v1", routes_1.default);
if (process.env.NODE_ENV === "production") {
    // Serve front-end app for all unmatched routes
    app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "../client", "dist")));
    app.get("/{*any}", function (req, res) {
        res.sendFile(path_1.default.resolve(path_1.default.resolve(), "../client", "dist", "index.html"));
    });
}
app.use(express_1.default.static(path_1.default.join(path_1.default.resolve(), "../client", "dist")));
app.get("/{*any}", function (req, res) {
    res.sendFile(path_1.default.resolve(path_1.default.resolve(), "../client", "dist", "index.html"));
});
//ERROR HANDLER
app.use(errorHandler_1.notFound);
app.use(errorHandler_1.errorHandler);
var PORT = 4000;
app.listen(PORT, function () { return console.log("Listening at PORT ".concat(PORT)); });
// if (numCPUs > 1) {
//     if (cluster.isPrimary) {
//         for (let i = 0; i < numCPUs; i++) {
//             cluster.fork();
//         }
//         cluster.on("exit", function (worker: any) {
//             console.log("Worker", worker.id, " has exited.");
//         });
//     } else {
//         app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
//     }
// } else {
//     app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
// }
// const obj = {
//     "07": [
//         {
//             id: 24,
//             userId: "1",
//             isLate: true,
//             dateTime: "2025-07-22T11:25:07.659Z",
//         },
//         {
//             id: 25,
//             userId: "1",
//             isLate: true,
//             dateTime: "2025-07-21T11:25:09.380Z",
//         },
//         {
//             id: 26,
//             userId: "1",
//             isLate: true,
//             dateTime: "2025-07-20T11:25:10.378Z",
//         },
//         {
//             id: 27,
//             userId: "1",
//             isLate: true,
//             dateTime: "2025-07-19T11:25:11.216Z",
//         },
//         {
//             id: 28,
//             userId: "1",
//             isLate: true,
//             dateTime: "2025-07-18T11:26:01.356Z",
//         },
//         {
//             id: 29,
//             userId: "1",
//             isLate: true,
//             dateTime: "2025-07-17T11:26:02.427Z",
//         },
//         {
//             id: 30,
//             userId: "1",
//             isLate: true,
//             dateTime: "2025-07-16T11:26:03.318Z",
//         },
//         {
//             id: 31,
//             userId: "1",
//             isLate: true,
//             dateTime: "2025-07-15T11:26:04.192Z",
//         },
//         {
//             id: 32,
//             userId: "1",
//             isLate: true,
//             dateTime: "2025-07-14T11:26:05.104Z",
//         },
//         {
//             id: 33,
//             userId: "1",
//             isLate: false,
//             dateTime: "2025-07-13T11:28:59.912Z",
//         },
//         {
//             id: 34,
//             userId: "1",
//             isLate: false,
//             dateTime: "2025-07-12T11:29:01.167Z",
//         },
//         {
//             id: 35,
//             userId: "1",
//             isLate: false,
//             dateTime: "2025-07-11T11:29:02.441Z",
//         },
//     ],
//     "06": [
//         {
//             id: 36,
//             userId: "1",
//             isLate: false,
//             dateTime: "2025-06-22T11:30:36.435Z",
//         },
//         {
//             id: 37,
//             userId: "1",
//             isLate: false,
//             dateTime: "2025-06-21T11:30:37.452Z",
//         },
//         {
//             id: 38,
//             userId: "1",
//             isLate: false,
//             dateTime: "2025-06-20T11:30:38.365Z",
//         },
//     ],
// };
// const array = [
//     [
//         "05",
//         [
//             {
//                 status: {
//                     id: 3,
//                     name: "cancelled",
//                 },
//                 saleDate: "2025-05-24T10:51:36.000Z",
//             },
//         ],
//     ],
//     [
//         "06",
//         [
//             {
//                 status: {
//                     id: 1,
//                     name: "pending",
//                 },
//                 saleDate: "2025-06-25T10:51:36.000Z",
//             },
//         ],
//     ],
//     [
//         "07",
//         [
//             {
//                 status: {
//                     id: 6,
//                     name: "success",
//                 },
//                 saleDate: "2025-07-23T10:51:36.000Z",
//             },
//             {
//                 status: {
//                     id: 6,
//                     name: "success",
//                 },
//                 saleDate: "2025-07-22T10:51:36.000Z",
//             },
//             {
//                 status: {
//                     id: 1,
//                     name: "pending",
//                 },
//                 saleDate: "2025-07-21T10:51:36.000Z",
//             },
//             {
//                 status: {
//                     id: 1,
//                     name: "pending",
//                 },
//                 saleDate: "2025-07-20T14:25:05.198Z",
//             },
//         ],
//     ],
// ];
// let lateArray = [];
// const ontimeArray = [];
// for (const [key, value] of Object.entries(obj)) {
//     // console.log(parseInt(key));
//     let late = 0;
//     let ontime = 0;
//     //@ts-ignore
//     // result[key] = {
//     //     late: [],
//     //     onTime: [],
//     // };
//     for (const entry of value) {
//         if (entry.isLate) {
//             late++;
//         } else {
//             ontime++;
//         }
//     }
//     lateArray[parseInt(key) - 1] = late;
//     ontimeArray[parseInt(key) - 1] = ontime;
// }
// console.log(lateArray);
// console.log(new Date());
// const time = new Date().getTime() - 60 * 60 * 1000;
// console.log(new Date(time));
// pusher.trigger("channel", "event", {
//     message: "hello world",
// });
// const date = new Date();
// console.log(new Date(2025, 5, date.getDate()).getDate());
// async function dropTable() {
//     await prisma.$executeRaw`DROP TABLE IF EXISTS leadCount;`;
//     // Or with IF EXISTS to prevent errors if the table doesn't exist:
//     // await prisma.$executeRaw`DROP TABLE IF EXISTS User;`;
// }
// dropTable();
var arr = [
    {
        id: 2,
        name: "p1",
        createdAt: "2025-08-14T16:37:52.145Z",
        updatedAt: "2025-08-14T16:37:52.145Z",
        User: [
            {
                id: 9,
                name: "asdsad",
                alias: "asdsadsad",
                role: "user",
                LeadCount: [],
            },
            {
                id: 14,
                name: "asdasds",
                alias: "dfsdfsdfsdfds",
                role: "user",
                LeadCount: [],
            },
            {
                id: 11,
                name: "user5",
                alias: "user5",
                role: "user",
                LeadCount: [],
            },
            {
                id: 10,
                name: "user1",
                alias: "user1",
                role: "user",
                LeadCount: [
                    {
                        count: 2,
                    },
                ],
            },
            {
                id: 15,
                name: "admin",
                alias: "first admin",
                role: "admin",
                LeadCount: [],
            },
            {
                id: 17,
                name: "closer2",
                alias: "closerSecond",
                role: "closer",
                LeadCount: [],
            },
            {
                id: 16,
                name: "closer1",
                alias: "closerFirst",
                role: "closer",
                LeadCount: [],
            },
        ],
    },
];
arr[0].User.map(function (item) { return console.log(item.LeadCount); });
(_a = arr[0].User) === null || _a === void 0 ? void 0 : _a.sort(function (a, b) { var _a, _b; return ((_a = b.LeadCount[0]) === null || _a === void 0 ? void 0 : _a.count) - ((_b = a.LeadCount[0]) === null || _b === void 0 ? void 0 : _b.count); });
