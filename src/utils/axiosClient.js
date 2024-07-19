import axios from 'axios'
 const token = JSON.parse(localStorage.getItem('token'))
 

const clienteAxios = axios.create({
 baseURL: 'https://front2-examen-final-pweb.vercel.app/api'

})

export const config = {
    headers: {
        "content-type":"application/json",
        'authorization': `Bearer ${token}`
      }
} 

export default clienteAxios