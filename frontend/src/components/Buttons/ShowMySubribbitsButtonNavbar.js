import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel, Modal } from "react-bootstrap";
import { deleteCommentAction } from "../../actions/commentActions";
import ConfirmDeleteCommentModal from "../Modals/ConfirmDeleteCommentModal";
import ShowMySubribbitsModal from "../Modals/ShowMySubribbitsModal";
import logoSmall from '../../image/greenFrog.png'
import { listOwnedAndJoinedSubribbits } from "../../actions/subribbitActions";


function ShowMySubribbitsButtonNavbar({ subribbit }) {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const ownedAndJoinedSubribbitList = useSelector(state => state.ownedAndJoinedSubribbitList)
    const { error: errorOwnedAndJoinedSubribbits, loading: loadingOwnedAndJoinedSubribbits, ownedAndJoinedSubribbits } = ownedAndJoinedSubribbitList

    const [modalShow, setModalShow] = useState(false);

    function onClickFunction() {
        setModalShow(true);

        dispatch(listOwnedAndJoinedSubribbits());
    }

    return (
        <div>
            {
                userInfo ?
                    (
                        <div>
                            <button type="button" id="buttonCommunities" class="btn btn-dark" onClick={() => onClickFunction()}>
                                <i class="fas fa-frog fa-lg"></i>
                                &nbsp;&nbsp;My Subribbits
                            </button>
                            <ShowMySubribbitsModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                subribbits={ownedAndJoinedSubribbits}
                            />
                        </div>
                    ) : null
            }

        </div>
    );
}

export default ShowMySubribbitsButtonNavbar;
