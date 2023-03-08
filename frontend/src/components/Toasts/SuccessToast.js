import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { deletePostAction } from "../../actions/postActions";
import Loader from "../Utilities/Loader";
import { useNavigate } from "react-router-dom"
import { DELETE_POST_RESET, DELETE_POST_DONE } from "../../actions/types";
import { Card, Form, Row, Col, Button, FloatingLabel, Toast } from "react-bootstrap";
import { DELETE_COMMENT_RESET } from "../../actions/types";



function SuccessToast({ message, showToast }) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(showToast);


    return (
        <Toast className="toast position-fixed" id="successToastCard" autohide delay={1000} onClose={() => setShow(false)} show={show}>
            <Toast.Header>
                <strong className="me-auto"><i class="far fa-check-circle"></i> Success</strong>
                <small></small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
        </Toast>
    );
}

export default SuccessToast;
