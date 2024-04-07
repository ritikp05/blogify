
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, login }) => {
    return (
        <>
            { 
                login ? children : <Navigate to="/login" />
            }
        </>
    )
}

export default ProtectedRoute