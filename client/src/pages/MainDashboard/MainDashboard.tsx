import TopPerformer from "./elements/TopPerformer";
import Carousel from "./elements/Carousel";
import EnergyBoilers from "./elements/EnergyBoilers";
import { getProcessLeadCount } from "../../api/mainDashboard";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";

const MainDashboard = () => {
    const { data: processLeadCount = [], isLoading } = useQuery({
        queryKey: ["process-lead-count"],
        queryFn: getProcessLeadCount,
    });

    return (
        <div className="overflow-hidden">
            <Carousel>
                <TopPerformer />
                {!isLoading ? (
                    processLeadCount?.map((item: any) => (
                        <EnergyBoilers details={item} />
                    ))
                ) : (
                    <Loader />
                )}
            </Carousel>
        </div>
    );
};

export default MainDashboard;
