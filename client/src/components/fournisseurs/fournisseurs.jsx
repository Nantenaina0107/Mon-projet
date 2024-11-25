/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Fournisseurs = () => {
    const navigate = useNavigate()
     const [alert, setAlert] = useState(false)
     const [classe, setClasse] = useState("")
     const [message, setMessage] = useState("")
    const URL = 'http://localhost:3001/getfrn'

    const [client, setClient] = useState([])
    const [rech, setRech] = useState('')

    useEffect(() => {
      axios.get(URL).then(response => {
        setClient(response.data)
      })
    },[])
    const search = (id) => {
      const URL_PK = `http://localhost:3001/pkfrn/${id}`
      axios.get(URL_PK).then((response) => {
        setRech(response.data)
      })
  
    }
  
    const addfrn = () => {
        navigate('/nouveauFournisseurs')
    }
    const updatefrn = (id) => {
      navigate(`/modifierfournisseurs/${id}`)
  }
  const deletefrn = (id) => {
    const URL_DE = `http://localhost:3001/deletefrn/${id}`
    axios.delete(URL_DE)
     setAlert(true)
    setClasse("alert-box-success")
    setMessage("Suppression reussit")
    const timer = setTimeout(() => {
    setAlert(false)
    window.location.reload()
    }, 3000)
    return () => clearTimeout(timer)
  }
    return (
      <>
        <div className="content">
            <div className="titre"><h2>Fournisseurs</h2>
                <button className="btn btn-light new" onClick={addfrn}>Nouveau</button>
            </div>
            <table className="table four">
                <thead>
                <tr>
                    <th>Numero</th>
                    <th>Nom</th>
                    <th>Pays</th>
                    <th>Ville</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th>Actions</th>
                </tr>
                </thead>
                   <tbody>
                   {
                     client.map((cli) => (
                       <tr key={cli.id}>
                       <td><i>FRN/0{cli.id}</i></td>
                       <td><i>{cli.nom}</i></td>
                       <td><i>{cli.pays}</i></td>
                       <td><i>{cli.ville}</i></td>
                       <td><i>{cli.mail}</i></td>
                       <td><i>{cli.phone}</i></td>
                       <td><i>{cli.adresse}</i></td>
                       <td>
                         <i>
                           <div className="dropdown">
                             <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                               <i><span className="bi bi-list"></span> Actions</i>
                             </button>
                             <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                               <li onClick={() => {updatefrn(cli.id)}}><button type="button" className="btn btn-light"><i className="dropdown-item"><span className="bi bi-pencil-square"></span> Modifier</i></button></li>
                               <li><button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#delete" onClick={() => {search(cli.id)}}><i className="dropdown-item"><span className="bi bi-trash"></span> Supprimer</i></button></li>
                             </ul>
                           </div>
                         </i>
                       </td>
                     </tr>
                     ))
                   }
                   </tbody>
            </table>
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
        <button type="button" className="btn btn-danger"data-bs-dismiss="modal"  onClick={() => {deletefrn(rech.id)}}>Supprimer</button>
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
      </div>
    </div>
  </div>
</div>
        </div>
           {
                    alert && (
                        <div className={classe}>
                            {message}
                        </div>
                    )
                }
      </>
    );
  };
  
  export default Fournisseurs;
  