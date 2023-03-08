import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { deletePostAction, updatePostAction } from "../../actions/postActions";
import Loader from "../Utilities/Loader";
import { useNavigate } from "react-router-dom"
import { DELETE_POST_RESET, UPDATE_POST_RESET, UPDATE_SUBRIBBIT_MEMBER_RESET } from "../../actions/types";
import SuccessToast from "../Toasts/SuccessToast";
import { subribbitMembersAction } from "../../actions/subribbitActions";
import Message from "../Utilities/Message"
import SubribbitMember from "../Subribbit/SubribbitMember";
import { updateSubribbitMemberAction } from "../../actions/subribbitActions";

function UpdateSubribbitMemberStatusModal(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [status, setStatus] = useState(props.member.status);

    const updateSubribbitMember = useSelector(state => state.updateSubribbitMember)
    const { loading, error, member } = updateSubribbitMember

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(updateSubribbitMemberAction(parseInt(props.member.userId), parseInt(status), parseInt(props.subribbit.id)))
    }

    if (member) {
        dispatch({ type: UPDATE_SUBRIBBIT_MEMBER_RESET })

        props.onHide()
    }

    console.log(props)
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton id="confirmDeleteModalHeader">
                <Modal.Title id="contained-modal-title-vcenter">
                    Update Status
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <small>Update status of member u/{props.member.username}</small>
                <Form
                    onSubmit={submitHandler}
                >

                    <Form.Control
                        as="select"
                        aria-label="Default select example"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option value="0" disabled>PENDING</option>
                        <option value="1">ACCEPTED</option>
                        <option value="2">REJECTED</option>
                        <option value="3">BANNED</option>
                    </Form.Control>

                </Form>

            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide} id="updateSubribbitMemberButtonCancel">Cancel</Button>
                <Button onClick={submitHandler} id="updateSubribbitMemberButtonConfirm">Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpdateSubribbitMemberStatusModal;