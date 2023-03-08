import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import UpdateMyProfileButton from "../Buttons/UpdateMyProfileButton";

function UserCard({ user }) {

    const userDateISO = new Date(user.date_joined)
    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = userDateISO.getDate()
    const year = userDateISO.getFullYear()
    const month = monthList[userDateISO.getMonth()]

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    function checkOwner() {
        if (userInfo != null) {
            if (userInfo.id == user.id) {
                return true
            }
        }
        return false
    }

    const isOwner = checkOwner()

    return (
        <Card className="p-3 rounded" id="userCardSize">
            <div class="row" align="center">
                <div class="col-md-6">
                    <img src={user.gravatarURL} id="userCardProfileImage" title="This unique Gravatar RoboHash profile image is made from your email." />
                </div>
                <div class="col-md-6">
                    <div class="row p-3">
                        <center>
                            <b>u/{user.username}</b>
                        </center>
                    </div>
                    <div class="row p-1">
                        {
                            isOwner ?
                            (
                                <UpdateMyProfileButton />
                            )
                            :null
                        }
                    </div>
                </div>
            </div>
            <hr />
            <div class="row pt-2" align="center">
                <b><i class="fas fa-birthday-cake"></i>&nbsp;Cake day</b>
            </div>
            <div class="row" align="center">
                <small>{date} {month} {year}</small>
            </div>

            <div class="row pt-5" align="center">
                <div class="col-md-6">
                    <b><i class="fas fa-pen"></i>&nbsp;Posts</b>
                </div>
                <div class="col-md-6">
                    <b><i class="fas fa-comment"></i>&nbsp;Comments</b>
                </div>
            </div>
            <div class="row" align="center">
                <div class="col-md-6">
                    <small>{user.numPosts}</small>
                </div>
                <div class="col-md-6">
                    <small>{user.numComments}</small>
                </div>
            </div>

            {
                isOwner ?
                    (
                        <div class="row pt-4" align="center">
                            <Link to="/createPost">
                                <button type="button" class="btn btn-dark btn-sm btn-block">Create post</button>
                            </Link>
                        </div>
                    )
                    :
                    (
                        <div>
                        </div>
                    )
            }

        </Card >
    );
}

export default UserCard;
