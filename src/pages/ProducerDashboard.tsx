import { useState } from "react";
import { useNavigate } from "react-router-dom"
export const ProducerDashboard = () => {
    const navigate = useNavigate();
    const [showInput, setShowInput] = useState(false);
    const [showAddProducer, setShowAddProducer] = useState(true);

    return (
        <>
            <h1>Producer Dashboard כניסת מפיקות</h1>
            {
                showAddProducer && (<button onClick={() => navigate('/AddingProducer') }>הוספת מפיקה</button>
            )
            }
            <button onClick={() => {setShowInput(true);setShowAddProducer(false)} }>מפיקה קיימת</button>
            {showInput && (
                <div>
                    <input type="text" placeholder="הכנס כתובת מייל להזדהות" />
                    <button  onClick={() => navigate('/ProducersEventList')}>send</button>
                </div>
            )}       
         </>)
}

