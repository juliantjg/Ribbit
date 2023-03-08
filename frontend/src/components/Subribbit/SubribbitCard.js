import React from "react";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import PostCardDropDown from "../Buttons/PostCardDropDown";
import VotePostButton from "../Buttons/VotePostButton";

function SubribbitCard({ subribbit }) {
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    function checkSubribbitPrivate() {
        if (subribbit.typeName == 'PRIVATE') return true;
        return false;
    }

    function getBadgeColour() {
        if (subribbit.currentUserStatus == 'OWNER') {
            return 'badge badge-secondary'
        }
        else if (subribbit.currentUserStatus == 'ACCEPTED') {
            return 'badge badge-primary'
        }
        else if (subribbit.currentUserStatus == 'REJECTED') {
            return 'badge badge-danger'
        }
        else if (subribbit.currentUserStatus == 'BANNED') {
            return 'badge badge-dark'
        }
        else if (subribbit.currentUserStatus == 'PENDING') {
            return 'badge badge-info'
        }
    }

    function isUserAffiliated() {
        if (subribbit.currentUserStatus === 'NOT JOINED') return false;
        return true;
    }

    return (
        <Card className="rounded" id="subribbitCardMain">
            <Link to={`/community/${subribbit.name}`} id="subribbitCardLink">
                <div class="row">
                    <div class="col-md-8">
                        <div class="row-md-1">
                            <strong>r/{subribbit.name}</strong>
                            {
                                checkSubribbitPrivate() ?
                                    (
                                        <span>
                                            &nbsp;<small>(Private)</small>
                                        </span>
                                    )
                                    : null
                            }
                        </div>
                        <div class="row-md-1">
                            <small>{subribbit.numMembers} joined</small>
                        </div>
                    </div>
                    <div class="col-md-4 pt-2" align="right">
                        {
                            isUserAffiliated() ?
                                (
                                    <span class={getBadgeColour()}>{subribbit.currentUserStatus}</span>
                                )
                                : null
                        }

                    </div>
                </div>
            </Link>
        </Card>
    );
}

export default SubribbitCard;
