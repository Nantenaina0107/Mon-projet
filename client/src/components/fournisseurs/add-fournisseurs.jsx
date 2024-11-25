import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable react/no-unescaped-entities */
const AjoutFournisseurs = () => {
    const [client, setClient] = useState([])
    const [alert, setAlert] = useState(false)
    const [classe, setClasse] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const URL = 'http://localhost:3001/createfrn'

    const handleChange = (e) => {
        const name = e.target.name 
        const value = e.target.value 

        setClient(values => ({...values, [name]:value}))
    }

    const addclient = () => {
        if(client.nom != null && client.pays != null && client.ville != null && client.mail != null && client.adresse != null && client.phone != null){
            if (isFinite(client.phone)) {
                axios.post("http://localhost:3001/getone",client).then((response) => {
                    if(response.data == null){
                        axios.post(URL,client)
                            setAlert(true)
                            setClasse("alert-box-success")
                            setMessage("Enregistrement reussit")
                            const timer = setTimeout(() => {
                                setAlert(false)
                                navigate('/fournisseurs')
                            }, 3000)
                            return () => clearTimeout(timer)
                    }else{
                        setAlert(true)
                        setClasse("alert-box-error")
                        setMessage("Adresse Email existant")
                        const timer = setTimeout(() => {
                            setAlert(false)
                        }, 3000)
                
                        return () => clearTimeout(timer)
                    }
                })
              
            }else{
                setAlert(true)
                setClasse("alert-box-error")
                setMessage("Telephone invalide")
                const timer = setTimeout(() => {
                    setAlert(false)
                }, 3000)
        
                return () => clearTimeout(timer)
            }
        }
        else {
            setAlert(true)
            setClasse("alert-box-error")
            setMessage("Erreur d'enregistrement")
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
                   <div className="titre"><h2>Creation d'une fournisseur</h2> <br/>
                   </div>
                   <div className="col-lg-4">
                       <div className="form-floating">
                           <input type="text" className="form-control" placeholder="Nom" name="nom" onChange={handleChange} />
                           <label htmlFor="">Nom</label>
                       </div>
                   </div>
                   <div className="col-lg-4">
                       <div className="form-floating">
                           <input type="text" className="form-control" placeholder="Pays" name="pays" onChange={handleChange} />
                           <label htmlFor="">Pays</label>
                       </div>
                   </div>
                   <div className="col-lg-4">
                       <div className="form-floating">
                           <input type="text" className="form-control" placeholder="Ville" name="ville" onChange={handleChange} />
                           <label htmlFor="">Ville</label>
                       </div>
                   </div>
                   <div className="col-lg-4">
                       <div className="form-floating">
                           <input type="email" className="form-control" placeholder="Email" name="mail" onChange={handleChange} />
                           <label htmlFor="">Email</label>
                       </div>
                   </div>
                   <div className="col-lg-4">
                       <div className="form-floating">
                           <input type="text" className="form-control" placeholder="Telephone" name="phone" onChange={handleChange} />
                           <label htmlFor="">Telephone</label>
                       </div>
                   </div>
                   <div className="col-lg-4">
                       <div className="form-floating">
                           <input type="text" className="form-control" placeholder="Adresse" name="adresse" onChange={handleChange} />
                           <label htmlFor="">Adresse</label>
                       </div>
        <button className="btn btn-primary cli" onClick={addclient}><span className="bi bi-check"></span> Sauvegarder</button>
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
 
export default AjoutFournisseurs;