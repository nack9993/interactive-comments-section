import { useState } from "react";

export default function CommentField({
  user,
  sendComment,
}: {
  user: any;
  sendComment: any;
}) {
  const [text, setText] = useState("");

  function fieldText(e: any) {
    setText(e);
  }

  return (
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
          onClick={() => sendComment(text)}
        >
          SEND
        </button>
      </div>
    </div>
  );
}
