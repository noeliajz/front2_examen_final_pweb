

function PrivateRoute ({children, role}){
    const token = JSON.parse(localStorage.getItem('token'))
    const roleUser = JSON.parse(localStorage.getItem('role'))

    if (token) {
        if (role===roleUser) {
            return children;
        }else{
            if (roleUser==='admin') {
                location.href = '/adminPage'
                
            }else{
                location.href = '/doctorUser'
            }
        }
        
    }else{
        location.href ='/'
    }
}
export default PrivateRoute