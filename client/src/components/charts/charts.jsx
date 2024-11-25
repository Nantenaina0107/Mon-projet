/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line} from 'recharts'
import axios from 'axios'

const Chart = () => {
 const [data, setData] = useState([])
 const [datas, setDatas] = useState([])

 useEffect(() => {
    axios.get('http://localhost:3001/getstocks').then((response) => {
       setData(response.data)
    })
    axios.get('http://localhost:3001/getprod').then((response) => {
       setDatas(response.data)
    })
 },[])

    return ( 
        <>
        <div className="content">
        <div className="row chart">
            <div className="col-lg-6">
               <div className="title"><h1><i> Matiere premiere</i></h1></div><br/>
            <BarChart
               width={500}
               height={400}
               data={datas}
               margin={{top:20,right:20, bottom:30, left:30}}
              >
                  <XAxis dataKey="nom" />
                  <YAxis />
                  <Bar dataKey="quantite" fill="#8884d8" />
                  <Tooltip />
              </BarChart>
            </div>
            <div className="col-lg-6">
            <div className="title"><h1><i>Produit finis</i></h1></div>
            <LineChart
               width={500}
               height={400}
               data={data}
              >
                  <XAxis dataKey="nom" />
                  <YAxis />
                  <Line dataKey="quantite" fill="#8884d8" type="monotone" />
                  <Tooltip />
              </LineChart>
            </div>
        </div>
        </div>
        </>
     );
}
 
export default Chart;