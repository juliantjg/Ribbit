import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { deletePostAction } from "../../actions/postActions";
import Loader from "../Utilities/Loader";
import { useNavigate } from "react-router-dom"
import { DELETE_POST_RESET } from "../../actions/types";

function ConfirmDeletePostModal(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const deletePost = useSelector(state => state.deletePost)
    const { loading, error, message } = deletePost



    const submitHandler = (e) => {
        // prevent default is used to prevent the page from refreshing
        e.preventDefault()
        // calling the action
        dispatch(deletePostAction(props.post.id))
    }

    if (message) {
        // navigate('/user/home')
        dispatch({ type: DELETE_POST_RESET })

        if (props.sub !== " ") {
            if (props.sub === 'home') {
                navigate('/home')
            } else if (props.sub === '-') {
                navigate('/explore')
            } else {
                navigate(`/community/${props.sub}`)
            }
        }
        else {
            navigate(`/user/${props.post.userName}`)
        }
    }

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton id="confirmDeleteModalHeader">
                <Modal.Title id="contained-modal-title-vcenter">
                    Delete post?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Are you sure you want to delete your post? You can't undo this.
                </p>
            </Modal.Body>

            <Modal.Footer>
                {
                    error && <b><small><div>{error}</div></small></b>
                }
                <Button onClick={props.onHide} id="confirmDeleteModalButtonCancel">Cancel</Button>
                {
                    loading ?
                        (
                            loading && <Button variant="dark" disabled>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </Button>
                        )
                        :
                        (
                            <Button onClick={submitHandler} id="confirmDeleteModalButtonSubmit">Delete post</Button>
                        )
                }
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmDeletePostModal;