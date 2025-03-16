import { useNavigate } from "react-router-dom"
export const Home = () => {
    const navigate = useNavigate();
    return (
        <>
        <h1>Home</h1>
        <button onClick={() => navigate('/ProducerDashboard')}>ProducerDashboard מפיקות</button>  
        <button onClick={() => navigate('/UserDashboard')}>UserDashboard משתמשים רגילים</button> 
        </> )  
 }
//לראות האם צריך שיחזור על עצמו