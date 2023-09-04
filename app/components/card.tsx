import { useEffect } from "react";
import { useState } from "react";
import Score from "./score";

export default function Card({ comment, reply }: { comment: any; reply: any }) {
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") as string));
  }, []);

  return (
    <>
      {comment.id ? (
        <div>
          <div className=" bg-white mb-4 p-5 text-black rounded-xl shadow-md">
            <div className="flex gap-2 items-center">
              <img
                width="30"
                height="30"
                src={comment.user.image.png}
                alt="avatar"
              />
              <b>{comment.user.username}</b>
              {user.username === comment.user.username && (
                <div className="text-[8px] px-1 bg-primary text-white  font-bold mr-2">
                  You
                </div>
              )}
              <span className=" text-sm text-grayish-blue">
                {comment.createdAt}
              </span>
            </div>

            <div className="text-sm mt-3">
              {comment.replyingTo && (
                <span className="font-bold mr-2 text-primary">
                  @{comment.replyingTo}
                </span>
              )}
              <span className=" text-grayish-blue">{comment.content}</span>
            </div>

            <div className="flex justify-between mt-3">
              <Score score={comment.score}></Score>

              <div>
                {user.username === comment.user.username && (
                  <a className="text-sm text-pale-red font-bold mr-2" href="">
                    Delete
                  </a>
                )}
                <button
                  className="text-sm text-primary font-bold"
                  onClick={() => reply(comment)}
                >
                  Replay
                </button>
              </div>
            </div>
          </div>
          {comment.replies &&
            comment.replies.map((replay: any) => {
              return (
                <>
                  <div className="ml-5">
                    <Card
                      key={comment.id}
                      comment={replay}
                      reply={reply}
                    ></Card>
                  </div>
                </>
              );
            })}
        </div>
      ) : (
        <div>ih</div>
      )}
    </>
  );
}
