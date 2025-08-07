import express, { Application, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import router from "./routes";
import { errorHandler, notFound } from "./middlewares/errorHandler";
import path from "path";
import { prisma } from "./lib/prismaClient";

const app: Application = express();

//MIDDLEWARES
app.use(
    cors({
        origin: "http://localhost:5173",
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
    app.use(express.static(path.join(path.resolve(), "client", "dist")));

    app.get("/{*any}", (req, res) => {
        res.sendFile(
            path.resolve(path.resolve(), "../client", "dist", "index.html")
        );
    });
}

console.log(path.join(path.resolve(), "../client", "dist"));
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
app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));

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
