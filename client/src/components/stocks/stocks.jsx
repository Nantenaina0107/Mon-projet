import axios from "axios";
import { useEffect, useState } from "react";

const Stocks = () => {
    const [stocks, setstocks] = useState([])
    const URL = 'http://localhost:3001/getstocks'

    useEffect(() => {
        axios.get(URL).then((response) => {
            setstocks(response.data)
        })
    },[])
    return ( 
        <>
            <div className="content">
         <div className="titre"> <h2>
             <i>Gestion des stocks</i>
         </h2></div>
                 <table className="table stock">
            <thead>
              <tr>
                <th><i>Numero</i></th>
                <th><i>Nom</i></th>
                <th><i>Quantité</i></th>
                <th><i>Prix unitaire</i> </th>
              </tr>
            </thead>
            <tbody>
            {
              stocks.map((cli) => (
                <tr key={cli.id}>
                <td><i>REF/0{cli.id}</i></td>
                <td><i>{cli.nom}</i></td>
                <td><i>{cli.quantite}</i></td>
                <td><i>{cli.unitaire}</i></td>
              </tr>
              ))
            }
            </tbody>
          </table>
            </div>  
        </>
     );
}
 
export default Stocks;