import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const Production = () => {
    const navigate = useNavigate()
    const [prod, setProd] = useState([])
    const [modal, setModal] = useState([])
    const [trans, setTrans] = useState([])  
    const [alert, setAlert] = useState(false)
    const [classe, setClasse] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
      axios.get('http://localhost:3001/getprod').then((response) => {
        setProd(response.data)
      })
    },[])
    const ajout = () => {
        navigate('/ajoutproduction')
    }
    const handleChange = (e) => {
      const name = e.target.name 
      const value = e.target.value 

      setModal(values => ({...values, [name]:value}))
    }
    const transformer = (id) => {
      axios.get(`http://localhost:3001/pkprod/${id}`).then((response) => {
        setTrans(response.data)
      })
  }
  const transform = (id) => {
    const val = modal.quantite*1.5
    const values = {
      "nom": modal.nom,
      "qte": trans.quantite-val,
      "quantite": modal.quantite,
      "prix": modal.prix,
      "qteProd": trans.quantite
    }
    if(modal.nom != "" && modal.quantite != null && modal.prix != null){
      if(val < trans.quantite){
        axios.put(`http://localhost:3001/updateprod/${id}`, values)
        setAlert(true)
        setClasse("alert-box-success")
        setMessage("Tranformation reussit")
        const timer = setTimeout(() => {
            setAlert(false)
            window.location.reload()
        }, 3000)

        return () => clearTimeout(timer)
      }
      else {
        setAlert(true)
        setClasse("alert-box-error")
        setMessage("Stocks inssuffisants")
        const timer = setTimeout(() => {
            setAlert(false)
            window.location.reload()
        }, 3000)

        return () => clearTimeout(timer)
      }
    }
   
}
    return ( 
        <>
            <div className="content">
          <div className="titre"><h2>Production</h2>
              <button className="btn btn-light new" onClick={ajout}>Nouveau</button></div>
                 <table className="table prod">
            <thead>
              <tr>
                <th>Numero</th>
                <th>Nom</th>
                <th>Fournisseurs</th>
                <th>Date d'expiration</th>
                <th>Quantité</th>
                <th>Unité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                {
                  prod.map((item) => (
                    <tr key={item.id}>
                <td>PROD/0{item.id}</td>
                <td>{item.nom}</td>
                <td>{item.fournisseurs}</td>
                <td>{item.date}</td>
                <td>{item.quantite}</td>
                <td>Kg</td>
                <td>
                  <i>
                    <div className="dropdown">
                      <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <i><span className="bi bi-list"></span> Actions</i>
                      </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><button type="button" className="btn btn-light"  data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {transformer(item.id)}}><i className="dropdown-item"><span className="fa fa-pencil"></span> Transformer</i></button></li>
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
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Transformation</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="Nom Produit" value={trans.nom} onChange={handleChange} />
  <label htmlFor="">Nom Produit</label>
</div>
<div className="form-floating mb-3">
  <input type="text" className="form-control" id="floatingInput" placeholder="Nom Produit finie" name="nom" onChange={handleChange} />
  <label htmlFor="">Nom Produit finie</label>
</div>
      <div className="form-floating mb-3 input-group">
  <input type="number" className="form-control" id="floatingInput" placeholder="Quantité Raisin" name="vin" value={trans.quantite}  onChange={handleChange} /><span className="input-group-text" id="basic-addon2">Kg</span>
  <label htmlFor="">Quantité Raisin</label>
</div>
      <div className="form-floating mb-3 input-group">
  <input type="number" className="form-control" id="floatingInput" placeholder="Quantité Vin" name="quantite" onChange={handleChange} /><span className="input-group-text" id="basic-addon2">Litre</span>
  <label htmlFor="">Quantité Vin</label>
</div>
<div className="form-floating input-group">
  <input type="number" className="form-control" id="floatingPassword" placeholder="Raisin necessaire" name="litre" value={modal.quantite * 1.5}  onChange={handleChange}/><span className="input-group-text" id="basic-addon2">Kg</span>
  <label htmlFor="floatingPassword">Raisin necessaire</label>
</div><br />
<div className="form-floating input-group">
  <input type="number" className="form-control" id="floatingPassword" placeholder="Prix" name="prix" onChange={handleChange} /><span className="input-group-text">Ar</span>
  <label htmlFor="floatingPassword">Prix</label>
</div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
        <button type="button" className="btn btn-primary" onClick={() => {transform(trans.id)}}>Confirmer</button>
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
}
 
export default Production;