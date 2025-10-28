import axios from 'axios';

// 🛑 La URL base debe apuntar al dominio donde se ejecuta tu backend (ej. localhost:8080 o el dominio de producción de la API).
// Si tu backend no está en Vercel, deberías usar tu URL de API real, por ejemplo:
// baseURL: 'http://localhost:8080/api'
const axiosClient = axios.create({
    /* baseURL: 'https://front2-examen-final-pweb.vercel.app/api */
     baseURL: 'http://localhost:8080/api'
});


// 1. ELIMINAMOS la exportación "config" fija.
// 2. USAMOS un interceptor para adjuntar el token dinámicamente.
axiosClient.interceptors.request.use((config) => {
    
    // Obtener el token del localStorage justo antes de cada solicitud
    const token = localStorage.getItem('token'); 
    
    // Si el token existe, se agrega el header de Autorización
    if (token) {
        // Asumiendo que guardaste el token como una cadena JSON (ej: "eyJ..."), 
        // lo parseamos para obtener solo la cadena del token
        try {
            const tokenParsed = JSON.parse(token);
            config.headers.Authorization = `Bearer ${tokenParsed}`;
        } catch (e) {
            // Si el token no es un JSON válido (ej: es solo la cadena), lo usamos directamente
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    
    // Aseguramos que el tipo de contenido siempre sea JSON
    config.headers['Content-Type'] = 'application/json';

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Ahora solo exportamos clienteAxios, ya no necesitamos la exportación "config"
export default axiosClient;