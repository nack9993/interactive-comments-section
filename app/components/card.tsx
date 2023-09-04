import { useEffect } from "react";
import { useState } from "react";
import Score from "./score";
import CommentField from "./commentField";

export default function Card({
  comment,
  main,
  reply,
  editComment,
  sendComment,
  currentComment,
  updateComment,
  isEdit,
}: {
  comment: any;
  reply: any;
  main: any;
  editComment: any;
  sendComment: any;
  currentComment: any;
  updateComment: any;
  isEdit: any;
}) {
  const [user, setUser] = useState({} as any);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") as string));
  }, []);

  const [text, setText] = useState(currentComment && currentComment.content);

  function fieldText(e: any) {
    setText(e);
  }

  function setEditComment(comment: any, main: any) {
    editComment(comment, main);
  }

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
              {!isEdit ? (
                <span className=" text-grayish-blue">{comment.content}</span>
              ) : (
                currentComment.id === comment.id &&
                currentComment.user.username === user.username && (
                  <>
                    <textarea
                      value={text}
                      placeholder="Add comment..."
                      className="border p-5 border-light-gray rounded-lg  h-[120px] w-full"
                      onInput={(e: any) => fieldText(e.target.value)}
                    />
                    <button
                      className="text-sm text-primary font-bold"
                      onClick={() => updateComment(text)}
                    >
                      Update
                    </button>
                  </>
                )
              )}
            </div>

            <div className="flex justify-between mt-3">
              <Score score={comment.score}></Score>

              <div>
                {user.username === comment.user.username ? (
                  <>
                    <a className="text-sm text-soft-red font-bold mr-2" href="">
                      Delete
                    </a>
                    <button
                      className="text-sm text-primary font-bold"
                      onClick={() => setEditComment(comment, main)}
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <button
                    className="text-sm text-primary font-bold"
                    onClick={() => reply(comment, main)}
                  >
                    Replay
                  </button>
                )}
              </div>
            </div>
          </div>
          {currentComment &&
            currentComment.id === comment.id &&
            comment.user.username !== user.username && (
              <CommentField user={user} sendComment={sendComment} />
            )}
          {comment.replies &&
            comment.replies.map((replay: any) => {
              return (
                <div
                  key={`comment-${comment.id}-${Math.random()}`}
                  className="ml-5"
                >
                  <Card
                    main={comment}
                    comment={replay}
                    reply={reply}
                    editComment={editComment}
                    currentComment={currentComment}
                    sendComment={sendComment}
                    updateComment={updateComment}
                    isEdit={isEdit}
                  ></Card>
                </div>
              );
            })}
        </div>
      ) : (
        <div>ih</div>
      )}
    </>
  );
}
