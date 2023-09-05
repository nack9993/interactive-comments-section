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
  deleteComment,
  parentComment,
  isEdit,
}: {
  comment: any;
  reply: any;
  main: any;
  parentComment: any;
  editComment: any;
  sendComment: any;
  currentComment: any;
  updateComment: any;
  deleteComment: any;
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

  function setDeleteComment(comment: any, main: any, parentComment: any) {
    deleteComment(comment, main, parentComment);
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

              <span className=" text-grayish-blue">{comment.content}</span>
              {isEdit &&
                currentComment.id === comment.id &&
                currentComment.user.username === user.username && (
                  <>
                    <textarea
                      value={text}
                      placeholder="Add comment..."
                      className="border p-5 border-light-gray rounded-lg  h-[120px] w-full"
                      onInput={(e: any) => fieldText(e.target.value)}
                    />
                  </>
                )}
            </div>

            <div className="flex justify-between mt-3">
              <Score score={comment.score}></Score>

              <div>
                {user.username === comment.user.username ? (
                  !isEdit ? (
                    <>
                      <a
                        className="text-sm text-soft-red font-bold mr-2 cursor-pointer"
                        onClick={() =>
                          setDeleteComment(comment, main, parentComment)
                        }
                      >
                        Delete
                      </a>
                      <button
                        className="text-sm text-primary font-bold cursor-pointer"
                        onClick={() => setEditComment(comment, main)}
                      >
                        Edit
                      </button>
                    </>
                  ) : (
                    <button
                      className="text-sm text-white font-bold border p-3 bg-primary rounded-xl cursor-pointer"
                      onClick={() => updateComment(text)}
                    >
                      Update
                    </button>
                  )
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
                    parentComment={parentComment}
                    editComment={editComment}
                    currentComment={currentComment}
                    sendComment={sendComment}
                    updateComment={updateComment}
                    deleteComment={deleteComment}
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
