import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import PostCardDropDown from "../Buttons/PostCardDropDown";
import VotePostButton from "../Buttons/VotePostButton";
import UpdateSubribbitMemberStatusModal from "../Modals/UpdateSubribbitMemberStatusModal";

function SubribbitMemberForMembers({ member, subribbit }) {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const [modalShow, setModalShow] = useState(false);

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
        </div>
    );
}

export default SubribbitMemberForMembers;
