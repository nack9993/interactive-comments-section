"use client";

import { useEffect } from "react";
import { useState } from "react";
import data from "../public/data.json";
import Card from "./components/card";
import CommentField from "./components/commentField";

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

  useEffect(() => {
    setComments([...comments, ...data.comments]);

    setUser(data.currentUser);

    localStorage.setItem("user", JSON.stringify(data.currentUser));
  }, []);

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

  function sendComment(text: any) {
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

    const mock = {
      id: 3,
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
      newComments[foundIndex].replies = [
        ...newComments[foundIndex].replies,
        ...[mock],
      ];
    } else {
      if (!newComments[foundIndex].replies[childIndex].replies) {
        newComments[foundIndex].replies[childIndex].replies = [];
      }
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
    console.log(currentComment);
    console.log(mainComment);
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
    console.log(newComments);
    console.log(foundIndex, childIndex);

    newComments[foundIndex].replies[childIndex].content = text;

    setComments([...newComments]);

    setIsEdit(false);
    setCurrentComment(null);
  }

  return (
    <div className="max-w-[660px]">
      {comments.map((comment: any) => (
        <Card
          key={`comment-${comment.id}-${Math.random()}`}
          main={mainComment}
          comment={comment}
          reply={replyComment}
          editComment={editComment}
          sendComment={sendComment}
          currentComment={currentComment}
          updateComment={updateComment}
          isEdit={isEdit}
        />
      ))}
    </div>
  );
}
