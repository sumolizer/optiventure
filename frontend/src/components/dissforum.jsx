import { useAuth } from "../context/AuthContext";
import CreateNoteModal from "./createnote";
import { useForumLogic } from "../context/forumuihelper";
import { useState } from "react";

const CommentsList = () => {
  const { user } = useAuth();
  const [votedComments, setVotedComments] = useState({});
  const handleClick = (commentId, type) => {
    if (!votedComments[commentId]) {
      handleVote(commentId, type);
      setVotedComments((prev) => ({ ...prev, [commentId]: true }));
    }
  };

  const {
    comments,
    showCreateModal,
    isLoading,
    error,
    showUserCommentsOnly,
    setShowCreateModal,
    handleCreateComment,
    handleDeleteComment,
    handleVote,
    toggleUserComments,
  } = useForumLogic(user);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="relative">
      <div className={`${showCreateModal ? "blur-md" : ""}`}>
        <div className="notescontainer p-4">
          <div className="flex justify-between items-center mb-5 mx-4">
            <h1 className="nv-active">🗒️ Discussion Forum</h1>
            {user && (
              <button onClick={toggleUserComments} className="hsmall">
                {showUserCommentsOnly
                  ? "Show All Comments"
                  : "Show My Comments"}
              </button>
            )}
          </div>

          {!user ? (
            <p className="nv-active bg-red-700 text-yellow-50 rounded-full inline-block p-1 px-2 mx-9 align-middle">
              Please <a href="/login">Login</a> to post your thoughts.
            </p>
          ) : (
            <button
              onClick={() => setShowCreateModal(true)}
              className="nv-active"
            >
              + Share your thoughts with the community!
            </button>
          )}

          <div className="flex gap-4 justify-between">
            {/* Categories on the left */}
            <div className="w-1/4 darkcontainer p-4 rounded-lg">
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <ul>
                <li className="mb-2">Business</li>
                <li className="mb-2">Food</li>
                <li className="mb-2">Sports</li>
                <li className="mb-2">Barber</li>
                {/* Add more categories as needed */}
              </ul>
            </div>

            {/* Comments */}
            <div className="w-3/4">
              <ul className="space-y-4">
                {comments.map((comment) => (
                  <li
                    key={comment._id}
                    className="text-center bg-[#0a2540] text-white font-bold p-6 rounded-lg shadow-md"
                  >
                    <div className="flex justify-between">
                      <div>
                        <span className="text-xs text-slate-600">
                          {new Date(comment.timestamp).toLocaleDateString(
                            "en-GB",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </span>
                        <span className="mx-2">|</span>
                        <span className="text-xs text-slate-600">
                          {comment.category}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600">
                        {comment.username}
                      </div>
                    </div>

                    <div className="my-4 text-sm">{comment.commentText}</div>

                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleClick(comment._id, "upvote")}
                          className={`hover:bg-gray-700 p-2 rounded-lg ${
                            votedComments[comment._id]
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={votedComments[comment._id]}
                        >
                          👍 {comment.votes}
                        </button>
                        <button
                          onClick={() => handleClick(comment._id, "downvote")}
                          className={`hover:bg-gray-700 p-2 rounded-lg ${
                            votedComments[comment._id]
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          disabled={votedComments[comment._id]}
                        >
                          👎
                        </button>
                      </div>
                      {user && user.uid === comment.userId && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-xs bg-red-500 text-white px-2 py-1 rounded-xl"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreateNoteModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateComment}
          kind="Comment"
          title="What's on your mind?"
          body="Other users can benefit from your thoughts"
        />
      )}
    </div>
  );
};

export default CommentsList;
