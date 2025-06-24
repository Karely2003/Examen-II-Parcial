import axios from 'axios';
import axion from 'axios'

const URL_API="http://localhost:5000";

export const valorpromediocategoria= async ()=>{

    const response= await axios.get(`${URL_API}/valor-promedio-categoria`);

    return response.data;
}


export const cantidadproductomarca= async ()=>{

    const response= await axios.get(`${URL_API}/cantidad-producto-marca`);

    return response.data;
}
