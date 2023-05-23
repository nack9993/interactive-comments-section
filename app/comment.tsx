"use client";

import { useEffect } from "react";
import { useState } from "react";
import data from "../public/data.json";
import Card from "./components/card";

export default function Comments() {
  const [comments, setComments] = useState([] as any);

  useEffect(() => {
    setComments([...comments, ...data.comments]);
  }, []);

  return (
    <div>
      {comments.map((comment: any) => {
        return (
          <div key={comment.id}>
            <Card comment={comment}></Card>
          </div>
        );
      })}
    </div>
  );
}
