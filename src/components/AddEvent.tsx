// import { useState } from "react";
// import {addEvent} from "../services/EventApi";


// export const AddEvent = () => {

//  const [message, setMessage] = useState(""); // הודעה למשתמש

//   const [event, setEvent] = useState({
//     id: 0,
//     name: "",
//     description:"",
//     // producerId:"",כאן צריך להיות שליפה מסייישן סטורייג של המייל מפיקה
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//    setEvent({ ...event, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const result = await addEvent(event);
//       setMessage("הארוע נוסף בהצלחה 🎉");
//       setEvent({ id: 0, name: "", description: "" }); // ניקוי הטופס
//       console.log('Producer added:', result);
//     } catch (error) {
//       console.error('Error adding event:', error);
//       setMessage("שגיאה בהוספת ארוע. נסה שוב.");
//     }
//   };

//   return (
//     <div>
//       <h2>הוספת ארוע חדש למפיקה:</h2>/*ואז מוצג גם שם המפיק עפ"י שליפה*/
//       <form onSubmit={handleSubmit} >


//         <label>
//          קוד ארוע:
//           <input type="number" name="id" value={event.id} onChange={handleChange} required />
//         </label>
//         <br />
//         <label>
//           שם הארוע:
//           <input type="text" name="name" value={event.name} onChange={handleChange} required />
//         </label>
//         <br />
//         <label>
//          תיאור הארוע ופרטים נוספים:
//           <textarea
//           <input type="text" name="description" value={event.description} onChange={handleChange} required />

//           />
//         </label>
//         <br />
//         <button type="submit">הוסף מפיקה</button>
//         {message && <p style={{ color: message.includes("שגיאה") ? "red" : "green" }}>{message}</p>}
//       </form>

//     </div>
//   );
// };
// }

import { useState } from "react";
import { addEvent } from "../services/EventApi";

export const AddEvent = () => {
  const [message, setMessage] = useState(""); // הודעה למשתמש
  const [event, setEvent] = useState({
    id: 0,
    name: "",
    description: "",
    producerId: "", // הוספנו כאן את producerId
  });


  // עדכון הפונקציה כך שתתמוך ב-input וגם ב-textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       // שליפת המפיק מ-Session Storage
//       const producerEmail = sessionStorage.getItem('producerEmail');
//       if (producerEmail) {
//         setEvent((prevEvent) => ({
//           ...prevEvent,
//           producerId: producerEmail, // עדכון עם ה-`producerId` הנכון
//         }));

//         const result = await addEvent(event);
//         setMessage("הארוע נוסף בהצלחה 🎉");
//         setEvent({ id: 0, name: "", description: "", producerId: "" }); // ניקוי הטופס
//         console.log('Event added:', result);
//       } else {
//         setMessage("לא נמצא מפיק!");
//       }
//     } catch (error) {
//       console.error('Error adding event:', error);
//       setMessage("שגיאה בהוספת ארוע. נסה שוב.");
//     }
//   };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // שליפת המפיק מ-Session Storage
      const producerEmail = sessionStorage.getItem('producerEmail');
      if (producerEmail) {
        // עדכון ה-state עם ה-`producerId` הנכון
        const updatedEvent = { ...event, producerId: producerEmail };
        setEvent(updatedEvent);

        // שליחה לשרת לאחר עדכון ה-state
        const result = await addEvent(updatedEvent);
        setMessage("הארוע נוסף בהצלחה 🎉");
        setEvent({ id: 0, name: "", description: "", producerId: "" }); // ניקוי הטופס
        console.log('Event added:', result);
      } else {
        setMessage("לא נמצא מפיק!");
      }
    } catch (error) {
      console.error('Error adding event:', error);
      setMessage("שגיאה בהוספת ארוע. נסה שוב.");
    }
  };

  return (
    <div>
      <h2>הוספת ארוע חדש למפיקה:</h2>
      <form onSubmit={handleSubmit}>
        <label>
          קוד ארוע:
          <input type="number" name="id" value={event.id} onChange={handleChange} required />
        </label>
        <br />
        <label>
          שם הארוע:
          <input type="text" name="name" value={event.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          תיאור הארוע ופרטים נוספים:
          <textarea name="description" value={event.description} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">הוסף ארוע</button>
        {message && <p style={{ color: message.includes("שגיאה") ? "red" : "green" }}>{message}</p>}
      </form>
    </div>
  );
};

