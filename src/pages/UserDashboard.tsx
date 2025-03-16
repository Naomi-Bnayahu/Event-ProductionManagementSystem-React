import { useNavigate } from "react-router-dom"
export const UserDashboard = () => {
    const navigate = useNavigate();








    return (
        <>
        <h1>UserDashboard</h1>
        <button onClick={() => navigate('/Home')}>Home</button> 
        <button onClick={() => navigate('/ProducerDashboard')}>ProducerDashboard</button>  
        </> )  
 }
