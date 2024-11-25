import AjoutFournisseurs from "../../components/fournisseurs/add-fournisseurs";
import Dashboard from "../../components/dashboard"

const AjoutFournisseursPage = () => {
  return (
    <>
            <Dashboard />
            <div id="content">
                <AjoutFournisseurs />
            </div>
    </>
  );
};

export default AjoutFournisseursPage;
