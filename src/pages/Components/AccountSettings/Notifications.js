import { useEffect, useState } from "react";
// import { useAuthContext } from "../../../hooks/useAuthContext";
// import { useNotificationContext } from "../../../hooks/useNotificationContext";
import trashIocn from '../../../images/trash.png';
import getRecommendation from "../Recommdation.js";

// date fns
import { format } from 'date-fns';

const Notifications = () => {

    const [notis, setNotis] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const getUser = JSON.parse(localStorage.getItem("user"));
            const userEmail = getUser.email;
            const params = {param1: userEmail};

            // const response = await fetch(`/api/notifications?${new URLSearchParams(params)}`);
            const response = await fetch(`https://weather-app-server-api.herokuapp.com/api/notifications?${new URLSearchParams(params)}`);
            const json = await response.json();

            if (response.ok) {
                setNotis(json);
                console.log(json);
            }
        }
        fetchNotifications();
        getRecommendation();
    }, [])

    const deleteNoti = async (event, id) => {

        // const response = await fetch('/api/notifications/' + id, {
        //     method: 'DELETE'
        // })
        const response = await fetch('https://weather-app-server-api.herokuapp.com/api/notifications/' + id, {
            method: 'DELETE'
        })
        const json = await response.json();

        if (response.ok) {
            event.target.parentNode.parentNode.parentNode.remove(); // delete the content from screen
            console.log("succcessfully deleted notification");
            console.log(json);
        }
    }

    return (
        <div className="hidden" id="notificationDisplay">
            <h2>Notifications</h2>
            {notis.map((currentNoti, idx) => {
                return (
                    <div className="eachNotification" key={idx}>
                        <div className="notiTitle">
                            <h5 className="notiCreatedAt">{format(new Date(currentNoti.createdAt), 'MM/dd/yyyy, eeee')}, {currentNoti.location}</h5>
                            <div className="trashIcon"><img src={trashIocn} alt="delete icon" onClick={event => deleteNoti(event, currentNoti._id)}/></div>
                        </div>
                        <div className="notiTemps">
                            <img src={currentNoti.icon} alt="today's img desc"/>
                            <p className="notiHighTemp">Highest: {currentNoti.hightemp}<span>&#176;</span>F</p>
                            <p className="notiLowTemp">Lowest: {currentNoti.lowtemp}<span>&#176;</span>F</p>
                        </div>
                        <p className="notiDesc">Description: {currentNoti.description}</p>
                        <p className="notiFit">Recommended Fit: {currentNoti.recommendedfit}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default Notifications;