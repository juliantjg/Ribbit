import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel, Modal } from "react-bootstrap";
import { deleteCommentAction } from "../../actions/commentActions";
import ConfirmDeleteCommentModal from "../Modals/ConfirmDeleteCommentModal";


function DeleteCommentButton({ post, comment }) {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    function checkOwner() {
        if (userInfo != null) {
            if (userInfo.username == comment.userName) {
                return true
            }
        }
        return false
    }

    const submitHandler = (e) => {
        // prevent default is used to prevent the page from refreshing
        e.preventDefault()
        // calling the action
        dispatch(deleteCommentAction(comment.id))
    }

    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            {
                checkOwner() ?
                    (
                        <>
                            <i class="far fa-trash-alt" type="submit" onClick={() => setModalShow(true)}></i>
                            <ConfirmDeleteCommentModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                comment={comment}
                                post={post}
                            />
                        </>
                    )
                    :
                    (
                        <></>
                    )
            }
        </div>
    );
}

export default DeleteCommentButton;
