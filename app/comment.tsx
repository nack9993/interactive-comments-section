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
  const [text, setText] = useState("");
  const [user, setUser] = useState({} as User);

  useEffect(() => {
    console.log(data.comments);
    setComments([...comments, ...data.comments]);

    setUser(data.currentUser);

    localStorage.setItem("user", JSON.stringify(data.currentUser));
  }, []);

  function replyComment(comment: any) {
    setCurrentComment(comment);
  }

  function sendComment() {
    const foundIndex = comments.findIndex(
      (x: any) => x.id == currentComment.id
    );

    const newComments = [...comments];

    console.log(newComments[foundIndex]);
    const mock = {
      id: 3,
      content:
        "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
      createdAt: "1 week ago",
      score: 4,
      replyingTo: "maxblagun",
      user: {
        image: {
          png: "./images/avatars/image-ramsesmiron.png",
          webp: "./images/avatars/image-ramsesmiron.webp",
        },
        username: "ramsesmiron",
      },
      replies: [],
    };

    newComments[foundIndex].replies = [mock];
    setComments([...newComments]);
  }

  function fieldText(e: any) {
    setText(e);
  }

  return (
    <div className="max-w-[660px]">
      {comments.map((comment: any) => (
        <Card key={comment.id} comment={comment} reply={replyComment} />
      ))}
      {currentComment && (
        <div className="bg-white mb-4 p-5 text-black rounded-xl shadow-md">
          <textarea
            value={text}
            placeholder="Add comment..."
            className="border p-5 border-light-gray rounded-lg  h-[120px] w-full"
            onInput={(e: any) => fieldText(e.target.value)}
          />
          <div className="flex justify-between items-center mt-3">
            <div>
              <img
                width="40"
                height="40"
                src={user.image && user.image.png}
                alt="avatar"
              />
            </div>

            <button
              className="px-7 py-4 text-lg font-bold bg-primary text-white rounded-md"
              onClick={() => sendComment()}
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
