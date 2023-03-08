import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import PostCardDropDown from "../Buttons/PostCardDropDown";
import VotePostButton from "../Buttons/VotePostButton";
import UpdateSubribbitMemberStatusModal from "../Modals/UpdateSubribbitMemberStatusModal";

function SubribbitMember({ member, subribbit }) {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [modalShow, setModalShow] = useState(false);

    function getButtonColour() {
        if (member.statusName == 'OWNER') {
            return 'btn btn-secondary btn-sm'
        }
        else if (member.statusName == 'ACCEPTED') {
            return 'btn btn-primary btn-sm'
        }
        else if (member.statusName == 'REJECTED') {
            return 'btn btn-danger btn-sm'
        }
        else if (member.statusName == 'BANNED') {
            return 'btn btn-dark btn-sm'
        }
        else if (member.statusName == 'PENDING') {
            return 'btn btn-info btn-sm'
        }
    }

    return (
        <div class="row pb-2" id="subribbitMemberCard">
            <div class="col-md-1">
                <Link to={`/user/${member.username}`}>
                    <img src={member.gravatarURL} id="subribbitMemberImage" />
                </Link>
            </div>
            <div class="col-md-9">
                <div id="subribbitMemberName">
                    <Link to={`/user/${member.username}`} id="subribbitMemberNameDecoration">
                        <b>{member.username}</b>
                    </Link>
                </div>
            </div>
            <div class="col-md-2 pt-3">
                <button type="button" class={getButtonColour(member.statusName)} onClick={() => setModalShow(true)}>{member.statusName}</button>
                <UpdateSubribbitMemberStatusModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    member={member}
                    subribbit={subribbit}
                />
            </div>
        </div>
    );
}

export default SubribbitMember;
