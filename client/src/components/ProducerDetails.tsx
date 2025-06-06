import { useLocation } from "react-router-dom";
import { useState, useEffect, use } from "react";
import { getProducerByEmail, updateProducer } from "../services/ProducerApi";
import ProducerEventList from "./ProducerEventList";

export const ProducerDetails = () => {

    const location = useLocation();
    const [producer, setProducer] = useState({
        name: "",
        phone: "",
        email: "",
        description: ""
    });
    const [showUpdateDetails, setShowUpdateDetails] = useState(false);
    const [showBottumUpdate, setShowBottumUpdate] = useState(true);
    const email = location.state?.email || ""; // מקבלים את האימייל שהוזן
    useEffect(() => {
        const getByEmail = async () => {
            try {
                const result = await getProducerByEmail(email); 
                if(result == "") {   
                    alert("המייל שהוזן לא קיים במערכת");
                    return;
                }
                else{
                    setProducer(prevState => ({
                        ...prevState,
                        name: result.name,
                        phone: result.phone,
                        email: result.email,
                        description: result.description
                    }));
                    console.log(producer);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        }
        getByEmail();
    }, [email]); // יפעל כאשר האימייל משתנה

    useEffect(() => {
        console.log("Updated producer:", producer);
    }, [producer]); // יפעל כל פעם שהסטייט משתנה
    // פונקציה שמעדכנת את הסטייט לפי הערך שהוקלד
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProducer(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const funcUpdateProducer = async () => {
        try {
            const result = await updateProducer(producer);
            alert("הפרטים עודכנו בהצלחה");
            console.log(result);
        }
        catch (error) {
            console.error('Error fetching events:', error);
        }

    }   // פונקציה לעדכון פרטי משתמש
    return (
        <div>
            <h1>פרטי מפיקה</h1>
            <h2>שם: {producer.name}</h2>
            <h2>אימייל: {producer.email}</h2>
            <h2>טלפון: {producer.phone}</h2>
            <h2>תיאור: {producer.description}</h2>
            {!showUpdateDetails && (
    <button onClick={() => setShowUpdateDetails(true)}>
        ערוך פרטי משתמש
    </button>
)}
                {showUpdateDetails &&
                <>

                    <input
                        type="text"
                        name="name"
                        value={producer.name}
                        onChange={handleInputChange}
                        placeholder="שם"
                    />
                    <input
                        type="email"
                        name="email"
                        value={producer.email}
                        onChange={handleInputChange}
                        placeholder="אימייל"
                    />
                    <input
                        type="tel"
                        name="phone"
                        value={producer.phone}
                        onChange={handleInputChange}
                        placeholder="טלפון"
                    />
                    <input
                        type="text"
                        name="description"
                        value={producer.description}
                        onChange={handleInputChange}
                        placeholder="תיאור"
                    />
                    <button onClick={() => { setShowUpdateDetails(false); funcUpdateProducer();setShowBottumUpdate(true) }}>שמור</button>
                </>}
            <ProducerEventList email={email} />
        </div>
    );
}

export default ProducerDetails;   