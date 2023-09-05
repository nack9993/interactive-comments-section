"use client";

import { useEffect } from "react";
import { useState } from "react";
import data from "../public/data.json";
import Card from "./components/card";

interface User {
  username: string;
  image: {
    png: string;
  };
}

export default function Comments() {
  const [comments, setComments] = useState([] as any);
  const [currentComment, setCurrentComment] = useState(null as any);
  const [mainComment, setMainComment] = useState(null as any);
  const [user, setUser] = useState({} as User);
  const [isEdit, setIsEdit] = useState(false as Boolean);
  const [isDelete, setIsDelete] = useState(false as Boolean);

  useEffect(() => {
    setComments([...comments, ...data.comments]);

    setUser(data.currentUser);

    localStorage.setItem("user", JSON.stringify(data.currentUser));
  }, []);

  useEffect(() => {
    if (isDelete) {
      if (confirm("Press a button!") == true) {
        deleteCommentT();
      } else {
      }
    }
  }, [currentComment]);

  function replyComment(comment: any, main: any) {
    console.log(comment);
    if (main) {
      // Is reply comment
      setCurrentComment(comment);
      setMainComment(main);
    } else {
      setCurrentComment(comment);
    }
  }

  function editComment(comment: any, main: any) {
    if (main) {
      setMainComment(main);
    }
    setCurrentComment(comment);
    setIsEdit(true);
  }

  function deleteComment(comment: any, main: any, parentComment: any) {
    if (main) {
      setMainComment(main);
    }

    const newComments = [...comments];
    const parentIndex = comments.findIndex(
      (x: any) => x.id == parentComment.id
    );

    let mainIndex: any;

    const findMe = (arr: any, i: any = null) => {
      if (arr.replies && arr.replies.length) {
        arr.replies.forEach((c: any, index: Number) => {
          console.log(c);
          if ((!c.replies || !c.replies.length) && c.id === comment.id) {
            mainIndex = index;

            const newComment = newComments[parentIndex].replies.filter(
              (_, index: Number) => {
                return index !== mainIndex;
              }
            );

            newComments[parentIndex].replies = newComment;

            setComments([...newComments]);
          }

          if (c.replies) {
            findMe(c.replies, index);
          }
        });
      } else {
        arr.forEach((c: any) => {
          console.log(c);
          if (c.id === comment.id) {
            mainIndex = i;

            const newComment = newComments[parentIndex].replies[
              i
            ].replies.filter((reply: any, index: Number) => {
              return index !== mainIndex;
            });
            newComments[parentIndex].replies[i].replies = newComment;

            setComments([...newComments]);
          }
        });
      }
    };

    findMe(parentComment);

    // setCurrentComment(comment);
    // setIsDelete(true);
  }

  function sendComment(text: any) {
    // Main comment
    let foundIndex, childIndex;

    foundIndex = comments.findIndex(
      (x: any) =>
        x.id ==
        (!currentComment.replyingTo ? currentComment.id : mainComment.id)
    );

    if (!currentComment.replyingTo) {
      childIndex = comments[foundIndex].replies.findIndex(
        (x: any) => x.id == currentComment.id
      );
    }

    const newComments = [...comments];

    const mock = {
      id: 0,
      content: text,
      createdAt: "1 week ago",
      score: 0,
      replyingTo: currentComment.user.username,
      user: {
        image: user.image,
        username: user.username,
      },
      replies: [],
    };

    if (!currentComment.replyingTo) {
      mock.id = newComments[foundIndex].replies.length + 3;
      newComments[foundIndex].replies = [
        ...newComments[foundIndex].replies,
        ...[mock],
      ];
      console.log(newComments[foundIndex].replies);
    } else {
      if (!newComments[foundIndex].replies[childIndex].replies) {
        newComments[foundIndex].replies[childIndex].replies = [];
      }

      mock.id = newComments[foundIndex].replies[childIndex].replies.length + 3;

      newComments[foundIndex].replies[childIndex].replies = [
        ...newComments[foundIndex].replies[childIndex].replies,
        ...[mock],
      ];
    }

    setComments([...newComments]);
    setCurrentComment(null);

    window.scroll(0, 0);
  }

  function updateComment(text: String) {
    // Main comment
    let foundIndex, childIndex;
    if (!currentComment.replyingTo) {
      foundIndex = comments.findIndex((x: any) => x.id == currentComment.id);
    } else {
      foundIndex = comments.findIndex((x: any) => x.id == mainComment.id);

      childIndex = comments[foundIndex].replies.findIndex(
        (x: any) => x.id == currentComment.id
      );
    }

    const newComments = [...comments];

    newComments[foundIndex].replies[childIndex].content = text;

    setComments([...newComments]);

    setIsEdit(false);
    setCurrentComment(null);
  }

  function deleteCommentT() {
    // Main comment
    let foundIndex, childIndex: any;

    foundIndex = comments.findIndex((x: any) => x.id == mainComment.id);

    childIndex = comments[foundIndex].replies.findIndex(
      (childComment: any) =>
        childComment.id == currentComment.id &&
        childComment.user.username === currentComment.user.username
    );

    const newComments = [...comments];

    const newComment = newComments[foundIndex].replies.filter(
      (_, index: Number) => {
        return index !== childIndex;
      }
    );

    newComments[foundIndex].replies = newComment;

    setComments([...newComments]);

    setIsDelete(false);
    setCurrentComment(null);
  }

  return (
    <div className="max-w-[660px]">
      {comments.map((comment: any) => (
        <Card
          key={`comment-${comment.id}-${Math.random()}`}
          main={mainComment}
          comment={comment}
          parentComment={comment}
          reply={replyComment}
          editComment={editComment}
          sendComment={sendComment}
          currentComment={currentComment}
          updateComment={updateComment}
          deleteComment={deleteComment}
          isEdit={isEdit}
        />
      ))}
    </div>
  );
}
