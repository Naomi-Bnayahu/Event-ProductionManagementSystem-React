import { useState } from "react";
import { addProducer } from '../services/ProducerApi';
const AddingProducer = () => {
  const [message, setMessage] = useState(""); // הודעה למשתמש

  const [producer, setProducer] = useState({
    name: "",
    email: "",
    phone: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducer({ ...producer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await addProducer(producer);
      setMessage("המפיקה נוספה בהצלחה! 🎉");
      setProducer({ name: "", email: "", phone: "", description: "" }); // ניקוי הטופס
      console.log('Producer added:', result);
    } catch (error) {
      console.error('Error adding producer:', error);
      setMessage("שגיאה בהוספת מפיקה. נסה שוב.");
    }
  };

  return (
    <div>
      <h2>הוספת מפיקה חדשה</h2>
      <form onSubmit={handleSubmit} >


        <label>
          שם מפיקה:
          <input type="text" name="name" value={producer.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          טלפון:
          <input type="tel" name="phone" value={producer.phone} onChange={handleChange} required />
        </label>
        <br />
        <label>
          אימייל:
          <input type="email" name="email" value={producer.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          תיאור:
          <textarea
            name="description"
            value={producer.description}
            onChange={(e) => setProducer({ ...producer, description: e.target.value })}
          />
        </label>
        <br />
        <button type="submit">הוסף מפיקה</button>
        {message && <p style={{ color: message.includes("שגיאה") ? "red" : "green" }}>{message}</p>}
      </form>

    </div>
  );
};

export default AddingProducer;
