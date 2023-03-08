import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel, Modal } from "react-bootstrap";
import { deleteCommentAction } from "../../actions/commentActions";
import ConfirmDeleteCommentModal from "../Modals/ConfirmDeleteCommentModal";
import logoSmall from '../../image/greenFrog.png'
import { listOwnedAndJoinedSubribbits } from "../../actions/subribbitActions";
import UpdateMyProfileModal from "../Modals/UpdateMyProfileModal";


function UpdateMyProfileButton() {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [modalShow, setModalShow] = useState(false);

    function onClickFunction() {
        setModalShow(true);
    }

    return (
        <div>
            {
                userInfo ?
                    (
                        <div>
                            <i class="fas fa-cog" id="updateUserProfileButton" onClick={() => onClickFunction()}></i>
                            <UpdateMyProfileModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                user={userLogin}
                            />
                        </div>
                    ) : null
            }

        </div>
    );
}

export default UpdateMyProfileButton;
