import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { deletePostAction, updatePostAction } from "../../actions/postActions";
import Loader from "../Utilities/Loader";
import { useNavigate } from "react-router-dom"
import { DELETE_POST_RESET, UPDATE_POST_RESET } from "../../actions/types";
import SuccessToast from "../Toasts/SuccessToast";

function UpdatePostModal(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updatePost = useSelector(state => state.updatePost)
    const { loading, error, message } = updatePost

    const [title, setTitle] = useState(props.post.title);
    const [content, setContent] = useState(props.post.content);
    const [nsfw, setNsfw] = useState(props.post.nsfw);

    const [isTitleCalled, setIsTitleCalled] = useState(false);
    const [isContentCalled, setIsContentCalled] = useState(false);
    const [isNsfwCalled, setIsNsfwCalled] = useState(false);

    const submitHandler = (e) => {
        // prevent default is used to prevent the page from refreshing
        e.preventDefault()
        // calling the action
        var titleSubmit = isTitleCalled ? title : props.post.title;
        var contentSubmit = isContentCalled ? content : props.post.content;
        var nsfwSubmit = isNsfwCalled ? nsfw : props.post.nsfw;

        console.log(isContentCalled)
        dispatch(updatePostAction(props.post.id, titleSubmit, contentSubmit, nsfwSubmit))
    }

    if (message) {
        navigate(`/post/${props.post.id}`)
        props.onHide()
        dispatch({ type: UPDATE_POST_RESET })
    }

    function callSetTitle(value) {
        setTitle(value);
        setIsTitleCalled(true);
    }

    function callSetContent(value) {
        setContent(value);
        setIsContentCalled(true);
    }

    function callSetNsfw(value) {
        setNsfw(value);
        setIsNsfwCalled(true);
    }

    function handleChangeNsfw(event) {
        if (event.target.checked) {
            callSetNsfw("y");
        } else {
            callSetNsfw("n");
        }
    }

    function getDefaultNsfwChecked() {
        if (props.post.nsfw === "y") return true;
        return false;
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
                    Update post
                </Modal.Title>
            </Modal.Header>
            <Form
                onSubmit={submitHandler}
            >
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Control
                            required
                            type="title"
                            defaultValue={props.post.title}
                            onChange={(e) => callSetTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-2" controlId="content">
                        <Form.Control
                            as="textarea"
                            rows={4}
                            type="content"
                            defaultValue={props.post.content}
                            onChange={(e) => callSetContent(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="NSFW"
                        onChange={handleChangeNsfw}
                        defaultChecked={getDefaultNsfwChecked()}
                    />

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

export default UpdatePostModal;