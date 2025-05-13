import { useLocation } from "react-router-dom";
import { updateEvent } from "../services/EventApi";
import { useEffect, useState } from "react";
import { getProducerByEmail } from "../services/ProducerApi";
import { Producer } from "../types/Producer"; // Import the Producer type

export const EventDetailsForProducer = () => {
    //     interface Event {
    //     name: string;
    //     description: string;
    //     producerId: string;
    // }
    const location = useLocation();
    const [showInput, setShowInput] = useState(false);
    const { event, email } = location.state || {}; // שליפת הנתונים שהועברו
    const [_event, _setEvent] = useState(event || { name: "", description: "", producerId: "" });
    /****** */
    const [producer, setProducer] = useState<Producer | null>(null); // סטייט לשמירת פרטי המפיק
    const [loading, setLoading] = useState(true); // סטייט למעקב אחרי מצב הטעינה
    /************** */

    // useEffect(() => {
    //     console.log("Updated producer:", _event);
    // }, [_event]); // יפעל כל פעם שהסטייט משתנה

    useEffect(() => {
        if (_event.producerId) {
            // שליפת פרטי המפיק על פי ה- email (או producerId, תלוי איך מאוחסן)
            const fetchProducer = async () => {
                try {
                    const producerData = await getProducerByEmail(_event.producerId); // כאן אנו מניחים שאתה שולף את המפיק לפי ה- email
                    setProducer(producerData);
                } catch (error) {
                    console.error("Error fetching producer:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProducer();
        }
    }, [_event.producerId]);



    if (!event) {
        return <div>שגיאה: אין נתוני אירוע</div>;
    }

    const editEvent = async () => {
        try {
            const result = await updateEvent(_event); // שימוש ב-_event במקום event
            alert("האירוע עודכן בהצלחה");
            console.log(result);
        } catch (error) {
            console.error("Error in updateEvent:", error);
        }
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        _setEvent((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
    };
    // הקודם
    //     return (
    //         <div>
    //             <div>
    //                 <h1>{_event.name}</h1>
    //                 <p>{_event.description}</p>
    //                 <p>מפיקה: {_event.producerId}</p>
    //                 <p>אימייל המפיקה: {email}</p>
    //                 <button onClick={() => setShowInput(true)}>לעריכת הארוע</button>
    //             </div>

    return (
        <div>
            <div>
                <h1>{_event.name}</h1>
                <p>{_event.description}</p>
                {loading ? (
                    <p>טעינת פרטי המפיק...</p>
                ) : producer ? (
                    <>
                        <p>שם המפיק: {producer.name}</p>
                        <p>אימייל המפיק: {producer.email}</p>
                    </>
                ) : (
                    <p>לא נמצאו פרטי המפיק</p>
                )}
                <button onClick={() => setShowInput(true)}>לעריכת הארוע</button>
            </div>
            {showInput && (
                <>
                
                    <input
                        type="text"
                        name="name"
                        value={_event.name}
                        onChange={handleInputChange}
                        placeholder="שם"
                    />
                    <input
                        type="text"
                        name="description"
                        value={_event.description}
                        onChange={handleInputChange}
                        placeholder="תאור"
                    />
                    {/*קצת בעיתי להביא למשתמש לשנות את המזהה של המפיק
                    כי אז צריך לעשות בדיקת תקינות שזה באמת מפיק שקיים
                    אמנם, יש לנו כבר בדיקה שבודקת אם קיים כהז מפיק 
                    אבל אם ניתן למשתמש לערוך שם מפיק נצטרך גם לעשות בדיקה מינמילית*/}
                    {/* <input
                        type="text"
                        name="producerId"
                        value={_event.producerId}
                        onChange={handleInputChange}
                        placeholder="אימיל מפיקה"
                    /> */}
                    <button onClick={() => { setShowInput(false); editEvent(); }}>שמור</button>
                </>
            )}
        </div>
    );
};