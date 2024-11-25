import axios from "axios";
import { useEffect, useState } from "react";

/* eslint-disable react/no-unescaped-entities */
const Notifications = () => {
    const [prod, setProd] = useState([])
    const [rech, setRech] = useState('')

    useEffect(() => {
      axios.get('http://localhost:3001/getexpire').then((response) => {
        setProd(response.data)
      })
    },[])
    const search = (id) => {
        const URL_PK = `http://localhost:3001/pkprod/${id}`
        axios.get(URL_PK).then((response) => {
          console.log("Search Response:", response.data);
          setRech(response.data)
        })
    
      }
    const deleteprod = (id) => {
        const URL_DE = `http://localhost:3001/deleteprod/${id}`
        axios.delete(URL_DE)
        window.location.reload()
      }
    return ( 
        <>
            <div className="content">
          <h1>Produit expiré</h1>
                <hr/>
                 <table className="table prod">
            <thead>
              <tr>
                <th><i>Numero</i></th>
                <th><i>Nom</i></th>
                <th><i>Fournisseurs</i></th>
                <th><i>Date d'expiration</i></th>
                <th><i>Quantité</i></th>
                <th><i>Unité</i> </th>
                <th><i>Actions</i></th>
              </tr>
            </thead>
            <tbody>
                {
                  prod.map((item) => (
                    <tr key={item.id}>
                <td><i>PROD/0{item.id}</i></td>
                <td><i>{item.nom}</i></td>
                <td><i>{item.fournisseurs}</i></td>
                <td><i>{item.date}</i></td>
                <td><i>{item.quantite}</i></td>
                <td><i>Kg</i></td>
                <td>
                  <i>
                    <div className="dropdown">
                      <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i><span className="bi bi-list"></span> Actions</i>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#delete" onClick={() => {search(item.id)}}><i className="dropdown-item"><span className="fa fa-trash"></span> Recycler</i></button></li>
                      </ul>
                    </div>
                  </i>
                </td>
              </tr>
                  ))
                }
            </tbody>
          </table>
            </div>
            <div className="modal fade" id="delete" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Suppression d'un client</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
            <h2><p><i>Vous voulez vraiment le supprimer</i></p></h2>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger"data-bs-dismiss="modal"  onClick={() => {deleteprod(rech.id)}}>Supprimer</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
      </div>
    </div>
  </div>
</div>

        </>
     );
}
 
export default Notifications;