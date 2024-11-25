/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AOS from 'aos'

const Dashboard = () => {
   const navigate = useNavigate()
   const [auth, setAuth] = useState(false)
   const [message, setMessage] = useState("")
   const [name, setName] = useState("")
   const [total, setTotal] = useState("")

   axios.defaults.withCredentials = true
   useEffect(() => {
      axios.get('http://localhost:3001').then((response) => {
             if(response.data.Status === "Success"){
                 setAuth(true)
                 setName(response.data.name)
             }else {
                setAuth(false)
                 setMessage(response.data.error)
                 navigate('/login')
             }
         })
         AOS.init()
         axios.get("http://localhost:3001/total").then((response) => {
            setTotal(response.data)
         }) 
   },[])
    const fournisseurs = () => {
        navigate('/fournisseurs')
    }
    const stocks = () => {
        navigate('/stocks')
    }
    const vente = () => {
        navigate('/vente')
    }
    const production = () => {
        navigate('/production')
    }
    const charts = () => {
      navigate('/')
  }
  const ventemvt = () => {
   navigate('/mouvement')
}
const notif = () => {
   navigate('/notifications')
}
    const logout = () => {
       axios.get('http://localhost:3001/logout').then(() => {
          location.reload(true)
       })
    }
    return ( 
        <>
            {
               auth ? (
                   <div className="body">
                       <nav className="navbar navbar-expand-lg navbar-light">
                           <div className="container-fluid">
                               <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                       data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false"
                                       aria-label="Toggle navigation">
                                   <span className="navbar-toggler-icon"></span>
                               </button>
                               <div className="collapse navbar-collapse" id="navbarScroll">
                                   <ul className="me-auto my-2 my-lg-0 navbar-nav-scroll">
                                       <div id="dashboard" className="collapse navbar-collapse">
                                           <button className="bouton hidden" id="bouton">Menu</button>
                                           <nav>
                                               <header>
                                                   <img src="./image/cap.jpg" alt="#" className="profil" />
                                                   <p>{name}</p>
                                               </header>
                                               <ul className="me-auto mb-2 mb-lg-0">
                                                   <li onClick={charts}  data-aos="fade-right" data-aos-duration="1200"><i className="bi bi-speedometer2"></i> Dashboard</li>
                                                   <li onClick={production}  data-aos="fade-right" data-aos-duration="1200"><i className="bi bi-archive"></i> Production</li>
                                                   <li onClick={fournisseurs} data-aos="fade-right" data-aos-duration="1400"><i className="bi bi-person-circle"></i> Fournisseurs</li>
                                                   <li onClick={stocks} data-aos="fade-right" data-aos-duration="1600"><i className="bi bi-basket"></i> Stocks</li>
                                                   <li onClick={vente} data-aos="fade-right" data-aos-duration="1800"><i className="bi bi-cart-plus"></i> Ventes</li>
                                                   <li onClick={ventemvt} data-aos="fade-right" data-aos-duration="2000"><i className="bi bi-graph-up-arrow"></i> Statistics</li>
                                               </ul>
                                           </nav>
                                       </div>
                                   </ul>
                               </div>
                           </div>
                       </nav>
                       <div className="toggle">
                           <div className="logo">
                               <h2>Logo</h2>
                           </div>
                           <div className="not" onClick={notif}><span className="bi bi-bell"></span><span className="nombre">{total.count}</span></div>
                           <div className="nom">
                               <h2><i>E</i><i>-</i><i>V</i><i>A</i><i>R</i><i>O</i><i>T</i><i>R</i><i>A</i></h2>
                               <div className="deco">
                                   <button className="btn btn-warning" onClick={logout}>Deconnexion</button></div>
                           </div>
                       </div>
                   </div>
               ) : (
                  <div className="div">
                     <p className="text-dark">{message}</p>
                  </div>
               )
            }
        </>
     );
}
 
export default Dashboard;