import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { deletePostAction, updatePostAction } from "../../actions/postActions";
import Loader from "../Utilities/Loader";
import { useNavigate } from "react-router-dom"
import { DELETE_POST_RESET, UPDATE_POST_RESET, UPDATE_SUBRIBBIT_MEMBER_RESET, UPDATE_SUBRIBBIT_RESET } from "../../actions/types";
import SuccessToast from "../Toasts/SuccessToast";
import { subribbitMembersAction } from "../../actions/subribbitActions";
import Message from "../Utilities/Message"
import SubribbitMember from "../Subribbit/SubribbitMember";
import { updateSubribbitAction } from "../../actions/subribbitActions";

function UpdateSubribbitModal(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [description, setDescription] = useState(props.subribbit.description);
    const [type, setType] = useState(props.subribbit.type);

    const [isDescriptionCalled, setIsDescriptionCalled] = useState(false);
    const [isTypeCalled, setIsTypeCalled] = useState(false);

    const updateSubribbit = useSelector(state => state.updateSubribbit)
    const { loading, error, subribbit } = updateSubribbit

    function handleChangeType(event) {
        if (event.target.checked) {
            callSetType(0)
        } else {
            callSetType(1)
        }
    }

    function getDefaultChecked() {
        if (props.subribbit.type == 0) return true;
        return false;
    }

    const submitHandler = (e) => {
        e.preventDefault()

        var descriptionSubmit = isDescriptionCalled ? description : props.subribbit.description
        var typeSubmit = isTypeCalled ? type : props.subribbit.type
        dispatch(updateSubribbitAction(parseInt(props.subribbit.id), descriptionSubmit, typeSubmit))
    }

    if (subribbit) {
        dispatch({ type: UPDATE_SUBRIBBIT_RESET })

        props.onHide()
    }

    function callSetDescription(value) {
        setDescription(value)
        setIsDescriptionCalled(true)
    }

    function callSetType(value) {
        setType(value)
        setIsTypeCalled(true)
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
                    Update <b>r/{props.subribbit.name}</b>
                </Modal.Title>
            </Modal.Header>
            <Form
                onSubmit={submitHandler}
            >
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="title">
                        Description
                        <Form.Control
                            as="textarea"
                            required
                            type="text"
                            defaultValue={props.subribbit.description}
                            onChange={(e) => callSetDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label="Private"
                        defaultChecked={getDefaultChecked()}
                        onChange={handleChangeType}
                    />
                </Modal.Body>

                <Modal.Footer>
                    {
                        error && <b><small><div>{error}</div></small></b>
                    }
                    <Button onClick={props.onHide} id="updateSubribbitMemberButtonCancel">Cancel</Button>
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

export default UpdateSubribbitModal;