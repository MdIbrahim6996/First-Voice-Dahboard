import { Scheduler } from "@aldabil/react-scheduler";
import { motion } from "motion/react";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useQuery } from "@tanstack/react-query";
import { getSingleEmployeeEveryAttendance } from "../../api/userAttendance";

const Attendance = () => {
    const { user } = useContext(AuthContext);
    const userId = user?.id;
    const { data } = useQuery({
        queryKey: ["user-attendance", userId],
        queryFn: () => getSingleEmployeeEveryAttendance(userId!),
    });

    const getFormattedTime = (date: Date) => {
        const initialDate = new Date(date);

        const year = initialDate.getFullYear();
        const month = initialDate.getMonth() + 1;
        const day = initialDate.getDate();
        const hours = initialDate.getHours();
        const minutes = initialDate.getMinutes();

        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedDate = `${year}/${month}/${day} ${hours}:${formattedMinutes}`;

        return formattedDate;
    };

    const events = data?.map((item: any) => ({
        event_id: item?.id,
        title: (
            <motion.p
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
            >
                {item?.isLate ? "LATE" : "ON TIME"}
            </motion.p>
        ),
        start: new Date(getFormattedTime(item?.dateTime)),
        end: new Date(getFormattedTime(item?.dateTime)),
        subtitle: `Mark Time: ${new Date(item?.dateTime)}`,
        color: item?.isLate ? "#C81D11" : "#0B6623",
        allDay: true,
    }));

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: -20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{ duration: 0.5, delay: 0.1 }}
        >
            <div className="p-5 max-h-screen">
                {data && (
                    <Scheduler
                        height={500}
                        dialogMaxWidth={"xs"}
                        view="month"
                        month={{
                            weekDays: [0, 1, 2, 3, 4, 5, 6],
                            step: 1,
                            weekStartOn: 0,
                            startHour: 9,
                            endHour: 17,
                            navigation: true,
                            cellRenderer: () => (
                                <div className="border border-slate-400 h-full rounded-lg"></div>
                            ),
                        }}
                        week={{
                            weekDays: [0, 1, 2, 3, 4, 5, 6],
                            step: 60,
                            weekStartOn: 0,
                            startHour: 9,
                            endHour: 24,
                            navigation: true,
                            cellRenderer: () => {
                                return (
                                    <div className="border border-slate-400 h-full rounded-lg"></div>
                                );
                            },
                        }}
                        events={events}
                        agenda={false}
                        editable={false}
                        deletable={false}
                    />
                )}
            </div>
        </motion.div>
    );
};

export default Attendance;

// [
//     {
//         event_id: 1,
//         title: (
//             <motion.p
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 1 }}
//             >
//                 LATE
//             </motion.p>
//         ),
//         start: new Date("2025/7/2 09:30"),
//         end: new Date("2025/5/2 10:30"),
//         subtitle: "Mark Time: 2:50 PM",
//         color: "red",
//         allDay: true,
//     },
//     {
//         event_id: 2,
//         title: (
//             <motion.p
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 1 }}
//             >
//                 ON TIME
//             </motion.p>
//         ),
//         start: new Date("2025/7/21 11:30"),
//         end: new Date("2025/7/21 2:30"),
//         subtitle: "Mark Time: 2:30 PM",
//         color: "green",
//         allDay: true,
//     },
// ];
