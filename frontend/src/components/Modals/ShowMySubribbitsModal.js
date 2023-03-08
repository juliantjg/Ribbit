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
import { subribbitMembersAction } from "../../actions/subribbitActions";
import Message from "../Utilities/Message"
import SubribbitMember from "../Subribbit/SubribbitMember";
import UpdateSubribbitMemberStatusModal from "./UpdateSubribbitMemberStatusModal";
import logoSmall from '../../image/greenFrog.png'

function ShowMySubribbitsModal(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function subribbitsExist() {
        if (props.subribbits.length > 0) return true;
        return false;
    }

    useEffect(() => {
    }, [])

    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton id="confirmDeleteModalHeader">
                <Modal.Title id="contained-modal-title-vcenter">
                    <img src={logoSmall} id="logoSmallShowMySubribbitsModal" />&nbsp;My Subribbits
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Showing Subribbits you own and joined as an <span class="badge badge-primary">ACCEPTED</span> member.
                <hr />
                <div class="p-3">
                    {
                        subribbitsExist() ?
                            (
                                <div>
                                    {
                                        props.subribbits.map(subribbit => (
                                            <div class="row pt-2">
                                                <Link to={`/community/${subribbit.name}`} id="mySubribbitItem" onClick={props.onHide}>
                                                    <center><b>r/{subribbit.name}</b></center>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                            :
                            (
                                <div>
                                    <center><b>No Subribbits yet</b> <br />
                                        <small>You can find Subribbits by clicking the <b><i className="fas fa-users fa-lg"></i> Communities</b> tab</small></center>
                                </div>
                            )
                    }

                </div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onHide} id="confirmDeleteModalButtonCancel">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ShowMySubribbitsModal;