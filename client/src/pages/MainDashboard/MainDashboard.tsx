import TopPerformer from "./elements/TopPerformer";
import Carousel from "./elements/Carousel";
import ProtectionAlert from "./elements/ProtectionAlert";
import EnergyBoilers from "./elements/EnergyBoilers";

const MainDashboard = () => {
    return (
        <div className="overflow-hidden">
            {/* <TopPerformer /> */}
            <Carousel>
                <TopPerformer />
                <EnergyBoilers />
                <ProtectionAlert />
            </Carousel>
        </div>
    );
};

export default MainDashboard;
