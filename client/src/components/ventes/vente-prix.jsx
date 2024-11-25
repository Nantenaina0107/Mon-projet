/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";

const Prix = () => {
    const [total, settotal] = useState([])
    const [somme, setsomme] = useState([])
    const [alert, setAlert] = useState(false)
    const [classe, setClasse] = useState("")
    const [message, setMessage] = useState("")

    useEffect(() => {
        axios.get("http://localhost:3001/getprix").then((response) => {
            settotal(response.data)
        })
    },[])

    const handleChange = (e) => {
        const name = e.target.name 
        const value = e.target.value 

        setsomme(values => ({...values, [name]:value}))
    }
    const payer = () => {
        const API = 'http://localhost:3001/payer'
        if(parseInt(total.somme) > parseInt(somme.donne)){
            setAlert(true)
            setClasse("alert-box-error")
            setMessage("Solde incomplet")
            const timer = setTimeout(() => {
                setAlert(false)
            }, 3000)
    
            return () => clearTimeout(timer)
        }
        else{
            axios.put(API,somme)
            setAlert(true)
            setClasse("alert-box-success")
            setMessage("Payement reussit")
            const timer = setTimeout(() => {
                setAlert(false)
                window.location.reload()
            }, 3000)
    
            return () => clearTimeout(timer)

        }
       
    }
    return ( 
        <>
                <div className="row money">
                    <div className="col-lg-10">
                        <div className="form-floating">
                            <input type="number" className="form-control" placeholder="Montant à payer" name="total" value={total.somme} onChange={handleChange} readOnly />
                            <label htmlFor="">Montant à payer</label>
                        </div>
                    </div>
                    <div className="col-lg-2">
                    <div className="form-floating">
                            <input type="text" className="form-control" placeholder="UM" value="Ar" readOnly/>
                            <label htmlFor="">UM</label>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="form-floating">
                            <input type="number" className="form-control" placeholder="Montant donner par le client"  name="donne" onChange={handleChange} />
                            <label htmlFor="">Montant du client</label>
                        </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="form-floating">
                            <input type="number" className="form-control" placeholder="Montant à rendre" value={somme.donne-total.somme}  name="rendre" onChange={handleChange} readOnly/>
                            <label htmlFor="">Montant à rendre</label>
                        </div>
                    </div>
                </div><br />
                <button className="btn btn-success bout" onClick={payer}><i className="bi bi-check">Valider</i></button>
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
 
export default Prix;