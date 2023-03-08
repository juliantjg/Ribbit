import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Row, Col, Button, FloatingLabel } from "react-bootstrap";
import { deleteCommentAction } from "../../actions/commentActions";
import { useNavigate } from "react-router-dom"
import { DELETE_COMMENT_RESET } from "../../actions/types";
import SuccessToast from "../Toasts/SuccessToast";

function ConfirmDeleteCommentModal(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteComment = useSelector(state => state.deleteComment)
  const { error: errorDeleteComment, loading: loadingDeleteComment, message: messageDeleteComment } = deleteComment

  const submitHandler = (e) => {
    // prevent default is used to prevent the page from refreshing
    e.preventDefault()
    // calling the action
    dispatch(deleteCommentAction(props.comment.id))
  }

  if (messageDeleteComment) {
    setTimeout(() => {
      dispatch({ type: DELETE_COMMENT_RESET })
      navigate(`/post/${props.post.id}`)
    }, 1000);
  }


  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton id="confirmDeleteModalHeader">
        <Modal.Title id="contained-modal-title-vcenter">
          Delete comment
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to delete your comment?
        </p>
      </Modal.Body>
      <Modal.Footer>
        {
          messageDeleteComment ?
            (
              <Button onClick={props.onHide} disabled id="confirmDeleteModalButtonCancel">Cancel</Button>
            )
            :
            (
              <Button onClick={props.onHide} id="confirmDeleteModalButtonCancel">Cancel</Button>
            )
        }
        {
          messageDeleteComment ?
            (
              <Button onClick={submitHandler} disabled id="confirmDeleteModalButtonSubmit">Delete</Button>
            )
            :
            (
              <Button onClick={submitHandler} id="confirmDeleteModalButtonSubmit">Delete</Button>
            )
        }
      </Modal.Footer>
      {messageDeleteComment && <SuccessToast message={messageDeleteComment} />}
    </Modal>
  );
}

export default ConfirmDeleteCommentModal;
