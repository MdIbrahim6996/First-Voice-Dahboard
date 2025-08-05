//@ts-nocheck

import { prisma } from "../lib/prismaClient";

export const arrayGrouping = async (obj) => {
    const status = await prisma.status.findMany({ select: { name: true } });

    status.map((item) => {
        globalThis[item?.name] = item?.name;
        globalThis[item?.name + "Array"] = [];
    });

    for (const [key, value] of Object.entries(obj)) {
        // console.log(parseInt(key));
        // let late = 0;
        // let ontime = 0;
        //@ts-ignore
        // result[key] = {
        //     late: [],
        //     onTime: [],
        // };
        for (const entry of value) {
            if (entry.statusId) {
                late++;
            } else {
                ontime++;
            }
        }
        lateArray[parseInt(key) - 1] = late;
        ontimeArray[parseInt(key) - 1] = ontime;
    }

    try {
    } catch (error) {}
};
