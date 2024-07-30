import axios from 'axios'
const token = localStorage.getItem('token')


const clienteAxios = axios.create({
 baseURL: 'http://localhost:3000/api'

})

export const config = {
    headers: {
        "content-type":"application/json",
        'authorization': `Bearer ${token}`
      }
}

export default clienteAxios