import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel, Modal } from "react-bootstrap";
import { deleteCommentAction } from "../../actions/commentActions";
import ConfirmDeleteCommentModal from "../Modals/ConfirmDeleteCommentModal";
import SubribbitMembersModal from "../Modals/SubribbitMembersModal";


function ShowSubribbitMembersButton({ subribbit }) {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <button type="button" class="btn btn-outline-dark btn-sm btn-block" onClick={() => setModalShow(true)}>Members Control</button>
            <SubribbitMembersModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                subribbit={subribbit}
            />
        </div>
    );
}

export default ShowSubribbitMembersButton;
