import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel, Modal } from "react-bootstrap";
import { deleteCommentAction } from "../../actions/commentActions";
import ConfirmDeleteCommentModal from "../Modals/ConfirmDeleteCommentModal";
import SubribbitMembersForMembersModal from "../Modals/SubribbitMembersForMembersModal";


function ShowSubribbitMembersForMembersButton({ subribbit }) {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <span class="badge badge-pill badge-dark" id="showSubribbitMembersForMembersButton" type="button" onClick={() => setModalShow(true)}>Show Members</span>
            <SubribbitMembersForMembersModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                subribbit={subribbit}
            />
        </div>
    );
}

export default ShowSubribbitMembersForMembersButton;
