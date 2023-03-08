import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { likeUnlikeAction } from "../../actions/commentActions";
import ConfirmDeletePostModal from "../Modals/ConfirmDeletePostModal";
import UpdatePostModal from "../Modals/UpdatePostModal";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Alert from 'react-bootstrap/Alert';
import { listNotificationsAction } from "../../actions/notificationActions";
import Loader from "../Utilities/Loader";
import NotificationCard from "./NotificationCard";

function NotificationButton({ }) {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const allNotifications = useSelector(state => state.allNotifications)
    const { error, loading, notifications } = allNotifications

    function handleShow() {
        setShow(true);
        dispatch(listNotificationsAction());
    }

    function notificationsExist() {
        if (notifications.length > 0) return true;
        else return false;
    }

    return (
        <div>
            <Button variant="button btn-outline-light" onClick={handleShow}>
                <i class="fas fa-bell"></i>
            </Button>

            <Offcanvas placement="end" show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Notifications</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {
                        loading ? <Loader />
                            : error ? 'Error'
                                :
                                notificationsExist() ?
                                    (
                                        <div>
                                            {notifications.map(notification => (
                                                <NotificationCard notification={notification} />
                                            ))}
                                        </div>
                                    )
                                    :
                                    (
                                        <div>
                                            No notifications yet
                                        </div>
                                    )
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
}

export default NotificationButton;
