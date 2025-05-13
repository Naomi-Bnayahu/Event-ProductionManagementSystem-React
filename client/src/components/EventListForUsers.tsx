import { useEffect, useState } from 'react';

import { getEvents } from '../services/EventApi';
import { Link } from 'react-router-dom';

export const EventListForUsers = () => {
    const [eventsList, setEventList] = useState<{ id: number; name: string; description: string; producerId: string }[]>([]);
    const [filterEventsList, setFilterEventsList] = useState<{ id: number; name: string; description: string; producerId: string }[]>([]);

    useEffect(() => {
        getAllEvent();
    }
        , []);

    const getAllEvent = async () => {
        try {
            const response = await getEvents();
            setEventList(response);
            setFilterEventsList(response);
        } catch (error) {
            console.error("Error fetching events:", error);
            setEventList([]);
            setFilterEventsList([]);
        }
    }

    const filterEvents = (e: any) => {
        const value = e.target.value.toLowerCase();
        const filtered = eventsList.filter((event) => {
            return event.name.toLowerCase().includes(value);
        }

        );
        setFilterEventsList(filtered);
    };
    return (
        <div>
            <input
                type="text"
                placeholder='לחיפוש אירוע'
                onChange={filterEvents}
            />            <h1>רשימת אירועים למשתמשים רגילים</h1>
            {
                filterEventsList.length > 0 ?
                    (
                        filterEventsList.map((event) => (
                            <div key={event.id}>

                                <li>
                                    <Link to="/EventDetailsForUser" state={{ event }}>{event.name}</Link>

                                </li>
                            </div>
                        ))
                    )
                    : (
                        <p>לא נמצאו אירועים</p>
                    )
            }
        </div>
    )
}