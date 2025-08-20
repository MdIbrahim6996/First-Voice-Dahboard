import TopPerformer from "./elements/TopPerformer";
import Carousel from "./elements/Carousel";
import EnergyBoilers from "./elements/EnergyBoilers";
import { getProcessLeadCount } from "../../api/mainDashboard";
import { useQuery } from "@tanstack/react-query";

const MainDashboard = () => {
    const { data: processLeadCount } = useQuery({
        queryKey: ["process-lead-count"],
        queryFn: getProcessLeadCount,
    });
    console.log(processLeadCount);

    return (
        <div className="overflow-hidden">
            <Carousel>
                <TopPerformer />
                {processLeadCount?.map((item: any) => (
                    <EnergyBoilers details={item} />
                ))}
            </Carousel>
        </div>
    );
};

export default MainDashboard;
