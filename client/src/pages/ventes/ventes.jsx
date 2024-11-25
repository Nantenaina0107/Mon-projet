import Vente from "../../components/ventes/ventes"
import VenteAdd from "../../components/ventes/vente-add"
import Dashboard from "../../components/dashboard"
import Toggle from "../../components/toggle"

const VentePage = () => {
  return (
    <>
            <Dashboard />
          <h1>Ventes</h1>
         <div className="content prix">
             <div className="titre"> <h2><i>Gestion des ventes</i></h2></div>
             <div className="row">
                 <VenteAdd />
                 <Vente />
             </div>
         </div>
    </>
  );
};

export default VentePage;
