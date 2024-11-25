import Chart from "../../components/charts/charts";
import Dashboard from "../../components/dashboard"

const ChartsPage = () => {
    return ( 
        <>
            <Dashboard />
            <div id="content">
                <Chart />
            </div>
        </>
     );
}
 
export default ChartsPage;