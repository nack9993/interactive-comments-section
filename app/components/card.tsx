import Score from "./score";

export default function Card({ comment }: { comment: any }) {
  console.log(comment);
  return (
    <>
      {comment.id ? (
        <div>
          <div className=" bg-white mb-4 p-5 text-black rounded-xl shadow-md">
            <div className="flex gap-2">
              <img
                width="30"
                height="30"
                src={comment.user.image.png}
                alt="avatar"
              />
              <b>{comment.user.username}</b>
              <span className=" text-sm">{comment.createdAt}</span>
            </div>

            <div className="text-sm mt-3">
              {comment.replyingTo && (
                <span className="font-bold mr-2 text-primary">
                  @{comment.replyingTo}
                </span>
              )}
              {comment.content}
            </div>

            <div className="flex justify-between mt-3">
              <Score score={comment.score}></Score>
              <a className="text-sm text-primary font-bold" href="">
                Replay
              </a>
            </div>
          </div>
          {comment.replies &&
            comment.replies.map((replay: any) => {
              return (
                <>
                  <div className="ml-5">
                    <Card comment={replay}></Card>
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
