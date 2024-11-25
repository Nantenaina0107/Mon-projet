/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const ModifierFournisseurs = () => {
    const [frn, setfrn] = useState([])
    const [alert, setAlert] = useState(false)
    const [classe, setClasse] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const {id} = useParams()
    const URL_PK = `http://localhost:3001/pkfrn/${id}`
    const URL_PUTF = `http://localhost:3001/updatefrn/${id}`

    useEffect(() => {
        axios.get(URL_PK).then(response => {
            setfrn(response.data)
        })
    },[])

    const handleChange = (e) => {
        const name = e.target.name 
        const value = e.target.value 

        setfrn(values => ({...values, [name]:value}))
    }

    const updatefrn = () => {
        if(frn.nom != "" && frn.pays != "" && frn.ville != "" && frn.mail != "" && frn.adresse != "" && frn.phone != ""){
            axios.put(URL_PUTF,frn)
            setAlert(true)
            setClasse("alert-box-success")
            setMessage("Modification reussit")
            const timer = setTimeout(() => {
                setAlert(false)
                navigate('/fournisseurs')
            }, 3000)
            return () => clearTimeout(timer)
        }
        else {
            setAlert(true)
            setClasse("alert-box-error")
            setMessage("Erreur de modification")
            const timer = setTimeout(() => {
                setAlert(false)
                navigate('/fournisseurs')
            }, 3000)
    
            return () => clearTimeout(timer)
        }
    }
    return ( 
        <>
           <div className="content">

        <div className="row">
            <div className="titre">
                <h2>Modification des fournisseurs</h2> <br/>
            </div>
            <div className="col-lg-4">
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Nom" name="nom" onChange={handleChange} value={frn.nom} />
                    <label htmlFor="">Nom</label>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Pays" name="pays" onChange={handleChange} value={frn.pays} />
                    <label htmlFor="">Pays</label>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Ville" name="ville" onChange={handleChange} value={frn.ville} />
                    <label htmlFor="">Ville</label>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="form-floating">
                    <input type="email" className="form-control" placeholder="Email" name="mail" onChange={handleChange} value={frn.mail} />
                    <label htmlFor="">Email</label>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Telephone" name="phone" onChange={handleChange} value={frn.phone} />
                    <label htmlFor="">Telephone</label>
                </div>
            </div>
            <div className="col-lg-4">
                <div className="form-floating">
                    <input type="text" className="form-control" placeholder="Adresse" name="adresse" onChange={handleChange} value={frn.adresse} />
                    <label htmlFor="">Adresse</label>
                </div>
        <button className="btn btn-primary cli" onClick={updatefrn}><span className="bi bi-check"></span> Sauvegarder</button>
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
 
export default ModifierFournisseurs;