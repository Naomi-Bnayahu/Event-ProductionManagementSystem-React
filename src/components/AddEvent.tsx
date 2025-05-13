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
      <h2>הוספת ארוע:</h2>
      <form onSubmit={handleSubmit}>
      
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
        <button type="submit">הוסף</button>
        {message && <p style={{ color: message.includes("שגיאה") ? "red" : "green" }}>{message}</p>}
      </form>
    </div>
  );
};

