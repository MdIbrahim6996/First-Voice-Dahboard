import { Scheduler } from "@aldabil/react-scheduler";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { getAllUserHoliday } from "../../api/holiday";
import type { Holiday } from "../../types/app.types";

const Holiday = () => {
    const { data: holidays } = useQuery({
        queryKey: ["holiday"],
        queryFn: getAllUserHoliday,
    });

    const events = holidays?.map((item: any) => ({
        event_id: item?.id,
        title: item?.name.toUpperCase(),
        start: new Date(item?.startDate),
        end: new Date(item?.endDate),
        color: "#2E8B57",
        subtitle: `${new Date(item?.startDate).toDateString()}`,
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
                {events && (
                    <Scheduler
                        height={500}
                        dialogMaxWidth={"xs"}
                        view="month"
                        events={events}
                        editable={false}
                        deletable={false}
                        onDelete={async (event) => console.log(event)}
                        hourFormat="12"
                        month={{
                            weekDays: [0, 1, 2, 3, 4, 5, 6],
                            step: 1,
                            weekStartOn: 0,
                            startHour: 9,
                            endHour: 17,
                            navigation: true,
                            cellRenderer: () => (
                                <div className="border border-slate-400 h-full rounded-lg" />
                            ),
                        }}
                        agenda={false}
                        disableViewNavigator
                    />
                )}
            </div>
        </motion.div>
    );
};

export default Holiday;
