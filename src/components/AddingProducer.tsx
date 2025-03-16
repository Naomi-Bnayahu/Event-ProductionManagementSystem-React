import { useState } from "react";


const AddingProducer = () => {
  const [producer, setProducer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProducer({ ...producer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Producer added:", producer);
    // כאן אפשר לשלוח את הנתונים לשרת (API)
  };

  return (
    <div>
    <p>הוספת מפיקה</p>


      <h2>הוספת מפיקה חדשה</h2>
      <form onSubmit={handleSubmit}>
        <label>
          שם מפיקה:
          <input type="text" name="name" value={producer.name} onChange={handleChange} required />
        </label>
        <br />
        <label>
          אימייל:
          <input type="email" name="email" value={producer.email} onChange={handleChange} required />
        </label>
        <br />
        <label>
          טלפון:
          <input type="tel" name="phone" value={producer.phone} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">הוסף מפיקה</button>
      </form>
    </div>
  );
};

export default AddingProducer;