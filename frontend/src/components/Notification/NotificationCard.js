import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function NotificationCard({ notification }) {

    function getLink() {
        if (notification.link) return notification.link
        return '#'
    }

    return (
        <Link to={getLink()} id="notificationCardLink">
            <div class="row" id="notificationCard">
                <div class="row">
                    <b>{notification.title}</b>
                </div>
                <div class="row">
                    <small>&#x2022; {notification.humanTimeDiffCreatedAt} ago</small>
                </div>
                <br />
                <div class="row">
                    <small>{notification.text}</small>
                </div>
            </div>
        </Link>
    );
}

export default NotificationCard;
