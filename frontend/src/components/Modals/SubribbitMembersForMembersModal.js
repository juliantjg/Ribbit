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
import Message from "../Utilities/Message"
import SubribbitMember from "../Subribbit/SubribbitMember";
import UpdateSubribbitMemberStatusModal from "./UpdateSubribbitMemberStatusModal";
import { subribbitMembersForMembersAction } from "../../actions/subribbitActions";
import SubribbitMemberForMembers from "../Subribbit/SubribbitMemberForMembers";

function SubribbitMembersForMembersModal(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateSubribbitMember = useSelector(state => state.updateSubribbitMember)
    const { error: errorUpdateMember, loading: loadingUpdateMember, member: memberUpdateMember } = updateSubribbitMember

    const subribbitMembersForMembers = useSelector(state => state.subribbitMembersForMembers)
    const { error: errorMembers, loading: loadingMembers, members: members } = subribbitMembersForMembers

    const requestJoinSubribbit = useSelector(state => state.requestJoinSubribbit)
    const { error: errorRequestJoinSubribbit, loading: loadingRequestJoinSubribbit, requestJoinSubribbit: messageRequestJoinSubribbit } = requestJoinSubribbit

    useEffect(() => {
        dispatch(subribbitMembersForMembersAction(props.subribbit.id))
    }, [memberUpdateMember, props.subribbit.id, messageRequestJoinSubribbit]) // passing match.sub here so that if match.sub changes, useEffect will be called. Read more: https://reactjs.org/docs/hooks-effect.html

    function membersExist() {
        if (members.length > 0) return true;
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
                    Joined Members
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                All <span class='badge badge-primary'>ACCEPTED</span> members of this Subribbit:
                <hr />
                <div class="p-3">
                    {loadingMembers ? <Loader />
                        : errorMembers ? <Message color='danger'>{errorMembers}</Message>
                            :
                            membersExist() ?
                                (
                                    <div>
                                        {members.map(member => (
                                            <SubribbitMemberForMembers member={member} subribbit={props.subribbit} />
                                        ))}
                                    </div>
                                )
                                :
                                (
                                    <div>
                                        <center><i class="fas fa-user-friends"></i> &nbsp; <b>No members yet</b> <br />
                                            <small>Start inviting people to Ribbit!</small></center>
                                    </div>
                                )

                    }
                </div>
            </Modal.Body>

            <Modal.Footer>
                {
                    errorMembers && <b><small><div>{errorMembers}</div></small></b>
                }
                <Button onClick={props.onHide} id="confirmDeleteModalButtonCancel">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SubribbitMembersForMembersModal;