import axios from 'axios'
 const token = JSON.parse(localStorage.getItem('token'))
 

const clienteAxios = axios.create({
 baseURL: 'http://localhost:8080/api'

})

export const config = {
    headers: {
        "content-type":"application/json",
        'authorization': `Bearer ${token}`
      }
} 

export default clienteAxios