import axios from 'axios'
const token = localStorage.getItem('token')


const clienteAxios = axios.create({
 baseURL: 'http://localhost:3000/api'
/*  baseURL: 'https://back-veterinaria-seven.vercel.app/api'
 */
})

export const config = {
    headers: {
        "content-type":"application/json",
        'authorization': `Bearer ${token}`
      }
}

export default clienteAxios