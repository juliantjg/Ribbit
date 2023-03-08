import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { deletePostAction, updatePostAction } from "../../actions/postActions";
import Loader from "../Utilities/Loader";
import { useNavigate } from "react-router-dom"
import { UPDATE_USER_PROFILE_RESET } from "../../actions/types";
import SuccessToast from "../Toasts/SuccessToast";
import { updateUserProfileAction } from "../../actions/userActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateMyProfileModal(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateUserProfile = useSelector(state => state.updateUserProfile)
    const { loading, error, message } = updateUserProfile

    const [username, setUsername] = useState(props.user.userInfo.username);

    const submitHandler = (e) => {
        // prevent default is used to prevent the page from refreshing
        e.preventDefault()
        // calling the action
        dispatch(updateUserProfileAction(username))
    }

    function notifyError() {
        toast(error);
    }

    function notifySuccess() {
        toast(message);
    }

    useEffect(() => {
        if (error) {
            notifyError()
            dispatch({ type: UPDATE_USER_PROFILE_RESET })
        }
        if (message) {
            dispatch({ type: UPDATE_USER_PROFILE_RESET })
            window.location.href = '/user/' + username
        }
    }, [error, message])

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            {message && <SuccessToast message={message} />}
            <Modal.Header closeButton id="confirmDeleteModalHeader">
                <Modal.Title id="contained-modal-title-vcenter">
                    Update profile
                </Modal.Title>
            </Modal.Header>
            <ToastContainer />
            <Form
                onSubmit={submitHandler}
            >
                <Modal.Body>
                    Username
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Control
                            required
                            type="text"
                            defaultValue={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
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
                                <Button onClick={submitHandler} id="confirmDeleteModalButtonSubmit">Update</Button>
                            )
                    }
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default UpdateMyProfileModal;