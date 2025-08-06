import { useQuery } from "@tanstack/react-query";
import { Bar } from "react-chartjs-2";
import { getUserMonthWiseAttendance } from "../../../../api/userAttendance";

const AttendanceComp = ({ userId }: { userId: number }) => {
    const { data = [] } = useQuery({
        queryKey: ["bar-chart"],
        queryFn: () => getUserMonthWiseAttendance(userId),
    });

    console.log(data);
    let groupdata = {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                label: "ON TIME",
                fillColor: "blue",
                data: data?.graphData?.ontimeArray,
            },
            {
                label: "LATE",
                fillColor: "red",
                data: data?.graphData?.lateArray,
            },
        ],
    };
    return (
        <div className="shadow-xl p-4 rounded-md w-[80%] mx-auto">
            <p className="text-xl uppercase mb-3 font-semibold">
                monthly overview
            </p>
            <div className="h-[20rem] mx-auto w-fi">
                <Bar
                    data={groupdata}
                    options={{ maintainAspectRatio: false }}
                />
            </div>
        </div>
    );
};

export default AttendanceComp;
