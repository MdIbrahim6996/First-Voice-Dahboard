import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { getDailyLeadCount } from "../../api/dashboard";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

const LeadCountChartModal = ({
    handleClose,
    id,
}: {
    handleClose: () => void;
    id: number;
}) => {
    const { data: leadCount = [] } = useQuery({
        queryKey: ["leadCount", id],
        queryFn: () => getDailyLeadCount(id!),
    });

    const reversedLeadCount = [...leadCount].reverse();
    console.log(reversedLeadCount);
    const date = new Date();
    const numOfDays = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top" as const,
            },
        },
    };

    let dataArrayLabel = Array.from({ length: numOfDays }, (_, i) => i + 1);
    let dataArray = Array.from({ length: numOfDays }, (_, __) => 0);
    leadCount?.map((item: any) => (dataArray[item?.date - 1] = item?.count));

    const data = {
        labels: dataArrayLabel,
        datasets: [
            {
                fill: true,
                data: dataArray,
                label: "Lead Count",
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
            <motion.div
                initial={{ opacity: 0.5, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-lg w-full max-w-3xl h-[70vh overflow-hidden"
            >
                <div>
                    <p className="bg-gray-200 py-2 px-6 text-xl">
                        Lead Count Chart
                    </p>

                    <div className="p-3">
                        <Line options={options} data={data} />
                    </div>
                    <div className="p-3">
                        <button
                            onClick={handleClose}
                            className="w-full cursor-pointer border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LeadCountChartModal;
