// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { getProducerByEmail } from "../services/ProducerApi";


// export const EventDetailsForUser = () => {

//     const location = useLocation();
//     const { event } = location.state || {};

    
//     return (
//         <div>
//             <h3>פרטי האירוע</h3>
//             <p>שם האירוע: {event.name}</p>
//             <p>תיאור האירוע: {event.description}</p>
//             {/* <p>מפיק האירוע: {producer ? producer.name : "לא נמצא מפיק"}</p> */}
//         </div>
//     );

// }

import { useLocation } from 'react-router-dom';
import { getProducerByEmail } from '../services/ProducerApi';
import { useState } from 'react';


export const EventDetailsForUser = () => {
    const location = useLocation();
    const { event } = location.state || {}; // שליפת הנתונים שהועברו

    if (!event) {
        return <div>שגיאה: אין נתוני אירוע</div>;
    }
    const [producer, setProducer] = useState({ name: "", phone: "", email: "", description: "" });
    const [showProducer, setShowProducer] = useState(false);
    const getProducer = async () => {
        try {
            const result = await getProducerByEmail(event.producerId);
            setProducer(result);
        } catch (error) {
            console.error("Error in getProducerByEmail:", error);
        }
    }
    return (
        <div>
            <div>
                <h1>{event.name}</h1>
                <p>{event.description}</p>
                <p>מפיקה: {event.producerId}</p>
                <button onClick={()=>{getProducer();setShowProducer(true)}}>פרטי מפיקה</button>
            </div>
            {
      showProducer&&(
        <div>
            <h1>פרטי מפיקה</h1>
            <p>שם: {producer.name}</p>
            <p>טלפון: {producer.phone}</p>
            <p>אימייל: {producer.email}</p>
            <p>תיאור: {producer.description}</p>
            <button onClick={()=>setShowProducer(false)}>סגור</button>
        </div>
      )
            }
        </div>
    )
}