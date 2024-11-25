import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/authentification/login'
import ChartsPage from './pages/charts/charts'
import MouvPage from './pages/charts/mouve'
import AjoutFournisseursPage from './pages/fournisseurs/ajoutPage'
import FournisseursPage from './pages/fournisseurs/fournisseurs'
import ModifFournisseursPage from './pages/fournisseurs/updatePage'
import AjoutProductionPage from './pages/production/ajoutProduction'
import Expie from './pages/production/expire'
import ProductionPage from './pages/production/production'
import StocksPage from './pages/stocks/stocks'
import VentePage from './pages/ventes/ventes'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/" Component={ChartsPage} />
          <Route path="/stocks" Component={StocksPage} />
          <Route path="/fournisseurs" Component={FournisseursPage} />
          <Route path="/nouveauFournisseurs" Component={AjoutFournisseursPage} />
          <Route path="/modifierfournisseurs/:id" Component={ModifFournisseursPage} />
          <Route path="/vente" Component={VentePage} />
          <Route path="/production" Component={ProductionPage} />
          <Route path="/ajoutproduction" Component={AjoutProductionPage} />
          <Route path="/mouvement" Component={MouvPage} />
          <Route path="/notifications" Component={Expie} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
