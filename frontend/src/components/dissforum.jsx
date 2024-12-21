import { useAuth } from "../context/AuthContext";
import CreateNoteModal from "./createnote";
import { useForumLogic } from "../context/forumuihelper";

const CommentsList = () => {
  const { user } = useAuth();
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
          <div className="flex justify-center items-center mb-5 mx-4">
            <h1 className="">🗒️ Discussion Forum</h1>
            {user && (
              <button onClick={toggleUserComments} className="hsmall">
                {showUserCommentsOnly
                  ? "Show All Comments"
                  : "Show My Comments"}
              </button>
            )}
          </div>

          {!user ? (
            <p className="btnsign bg-red-700 text-yellow-50 rounded-full inline-block p-1 px-2 mx-9 align-middle">
              Please <a href="/login">Login</a> to post your thoughts.
            </p>
          ) : (
            <button
              onClick={() => setShowCreateModal(true)}
              className="btnsign"
            >
              + Share your thoughts with the community!
            </button>
          )}

          <ul className="flex flex-wrap gap-4 justify-center">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="text-center bg-[#0a2540] text-white font-bold p-3 rounded-lg shadow-md"
                style={{
                  flex: "0 1 calc(20% - 1rem)",
                  maxWidth: "calc(20% - 1rem)",
                  minHeight: "20px",
                }}
              >
                <h6 className="text-xs text-slate-600 rounded-md p-1 inline-block mt-0">
                  {new Date(comment.timestamp).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </h6>
                <div>{comment.commentText}</div>
                <div className="flex justify-center gap-2 mt-2">
                  <button
                    onClick={() => handleVote(comment._id, "upvote")}
                    className="hover:bg-gray-700 p-1 rounded"
                  >
                    👍 {comment.votes > 0 ? comment.votes : 0}
                  </button>
                  <button
                    onClick={() => handleVote(comment._id, "downvote")}
                    className="hover:bg-gray-700 p-1 rounded"
                  >
                    👎
                  </button>
                  <h6 className="hsmall ">{comment.username}</h6>

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
