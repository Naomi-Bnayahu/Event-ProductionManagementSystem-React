import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getEventById } from "../services/EventApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteEvent } from "../services/EventApi";
import { addEvent } from "../services/EventApi";

const ProducerEventList = ({ email }: { email: string }) => {
  const navigate = useNavigate();

  const location = useLocation();

  const [eventsList, setEventList] = useState<{ id: number; name: string; description: string; producerId: string }[]>([]);

  useEffect(() => {
    if (email) {
      getEventByEmail();
    }
  }, [email]); // נפעיל את הפונקציה כש-email משתנה

  const getEventByEmail = async () => {
    try {
      const response = await getEventById(email);
      setEventList(response);
    } catch (error) {
      console.error("Error fetching events:", error);
      setEventList([]);
    }
  }
  const deleteEventById = async (id: number) => {
    try {
      await deleteEvent(id);
      setEventList((prevEvents) => prevEvents.filter((event) => event.id !== id));
      alert("האירוע נמחק בהצלחה");
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }

  const handleAddEventClick = () => {
    // שמירה של המפיק ב-Session Storage
    sessionStorage.setItem('producerEmail', email);
    navigate('/addEvent');
  };

  return (
    <div>
      <div>
        <h3 >רשימת הארועים למפיקה</h3>
        {
          eventsList.length > 0 ?
            (
              eventsList.map((event) => (
                <div key={event.id}>

                  <li>
                    <Link to="/EventDetailsForProducer" state={{ event, email }}>{event.name}</Link>
                  </li>
                  <button onClick={()=>deleteEventById(event.id)}>מחיקה</button>
                  </div>

              ))
            )
            : (
              <p>לא נמצאו אירועים</p>
            )

        }
      <button onClick={handleAddEventClick}>הוספה</button>
      </div>
    </div>
  );
};

export default ProducerEventList;
