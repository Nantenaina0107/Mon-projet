import { useEffect, useState } from 'react';
import { BarChart, Bar,XAxis, YAxis, Tooltip} from 'recharts'
import axios from 'axios'

const Mouvement = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:3001/mouv').then((response) => {
           setData(response.data)
        })
     },[])
    return ( 
        <>
            <div className="content">
                <div className="mouv">
                    <div className="title"><h1><i>Mouvement de vente</i></h1></div>
                    <BarChart
                        width={1000}
                        height={550}
                        data={data}
                        margin={{top:20,right:20, bottom:30, left:30}}
                    >
                        <XAxis dataKey="produit" />
                        <YAxis />
                        <Bar dataKey="quantite" fill="#ff3333" />
                        <Tooltip />
                    </BarChart>
                </div>
            </div>
        </>
     );
}
 
export default Mouvement;