import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { requestJoinSubribbitAction } from "../../actions/subribbitActions";
import ShowSubribbitMembersButton from "../Buttons/ShowSubribbitMembersButton";
import { subribbitMembersAction } from "../../actions/subribbitActions";
import UpdateSubribbitButton from "../Buttons/UpdateSubribbitButton";
import ShowSubribbitMembersForMembersButton from "../Buttons/ShowSubribbitMembersForMembersButton";

function SubribbitSideBar({ user, sub }) {
    const dispatch = useDispatch();

    const subribbitDateISO = new Date(sub.subribbit.createdAt)
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = subribbitDateISO.getDate()
    const year = subribbitDateISO.getFullYear()
    const month = monthList[subribbitDateISO.getMonth()]

    function checkSubribbitPrivate() {
        if (sub.subribbit.typeName === 'PRIVATE') return true;
        return false;
    }

    function checkOwner() {
        if (user != null) {
            if (sub.subribbit.ownerId == user.id) {
                return true
            }
        }
        return false
    }

    // get userLogin from state 
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    function isUserAffiliated() {
        if (sub.subribbit.currentUserStatus === 'NOT JOINED') return false;
        return true;
    }

    function isMember() {
        if (sub.subribbit.currentUserStatus === 'ACCEPTED') return true;
        return false;
    }

    const requestJoinSubribbitButton = (e) => {
        e.preventDefault()
        console.log('asda')
        dispatch(requestJoinSubribbitAction(sub.subribbit.id))
    }

    return (
        <Card className="p-4 rounded" id="subribbitSideBarSize">
            <div class="mr-3 row">
                <h5>r/{sub.subribbit.name}</h5>
                <hr />
            </div>

            <div class="row" id="numOfMembersDiv">
                <div class="col-md-3">
                    {
                        checkSubribbitPrivate() ?
                            (
                                <span class="badge badge-info">{sub.subribbit.typeName}</span>
                            )
                            :
                            (
                                <span class="badge badge-secondary">{sub.subribbit.typeName}</span>
                            )
                    }
                </div>
                <div class="col-md-2">
                </div>
                <div class="col-md-4">
                    {sub.subribbit.numPosts} post(s)
                </div>
                <div class="col-md-3">
                    {sub.subribbit.numMembers} joined
                </div>
            </div>

            <div class="row pt-3 ps-3" id="subribbitSidebarDescription">
                <div align="right">
                    {
                        sub.subribbit.id ?
                            (
                                <ShowSubribbitMembersForMembersButton subribbit={sub.subribbit} />
                            ) : null
                    }

                </div>
                <div>
                    <i class="fas fa-info-circle"></i> &nbsp; About community
                </div>
                <div>{sub.subribbit.description}</div>
                <br /> <br />
                <div> <i class="fas fa-birthday-cake"></i> &nbsp; Created at: {date} {month} {year} </div>
                <div> <i class="fas fa-user-check"></i> &nbsp;Owner: {sub.subribbit.ownerUsername} </div>
            </div>

            {
                userInfo ?
                    (
                        checkOwner() ?
                            (
                                <div class="row pt-4">
                                    <div class="col-md-6">
                                        <ShowSubribbitMembersButton subribbit={sub.subribbit} />
                                    </div>
                                    <div class="col-md-6">
                                        <UpdateSubribbitButton subribbit={sub.subribbit} />
                                    </div>
                                </div>
                            )
                            :
                            (
                                isUserAffiliated() ?
                                    (
                                        isMember() ?
                                            (
                                                <div class="row pt-4">
                                                    <button type="button" disabled class="btn btn-secondary btn-sm btn-block"> JOINED </button>
                                                </div>
                                            )
                                            :
                                            (
                                                <div class="row pt-4">
                                                    <button type="button" disabled class="btn btn-outline-dark btn-sm btn-block"> {sub.subribbit.currentUserStatus} </button>
                                                </div>
                                            )
                                    )
                                    :
                                    (
                                        checkSubribbitPrivate() ?
                                            (
                                                <div class="row pt-4">
                                                    <button type="button" class="btn btn-outline-dark btn-sm btn-block" onClick={requestJoinSubribbitButton}> Request Join </button>
                                                </div>
                                            )
                                            :
                                            (
                                                <div class="row pt-4">
                                                    <button type="button" class="btn btn-outline-dark btn-sm btn-block" onClick={requestJoinSubribbitButton}> Join </button>
                                                </div>
                                            )

                                    )
                            )
                    )
                    :
                    (
                        <div class="row pt-4">
                            <Link to="/login">
                                <button type="button" class="btn btn-outline-dark btn-sm btn-block"> Login </button>
                            </Link>
                        </div>
                    )
            }

        </Card >
    );
}

export default SubribbitSideBar;
