import { useAuth } from "../context/AuthContext";
import CreateNoteModal from "./createnote";
import { useForumLogic } from "../context/forumuihelper";
import { useState } from "react";

const CommentsList = () => {
  const { user } = useAuth();
  const [votedComments, setVotedComments] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const categories = [
    "All",
    "Food & Dining",
    "Retail & Shops",
    "Beauty & Personal Care",
    "Health & Fitness",
    "Automotive",
    "Home Services",
    "Travel & Hospitality",
    "Entertainment",
    "Tech & Office",
    "Pet Services",
    "Family & Kids",
    "Small Businesses",
  ];

  const handleClick = (commentId, type) => {
    if (!votedComments[commentId]) {
      handleVote(commentId, type);
      setVotedComments((prev) => ({ ...prev, [commentId]: true }));
    }
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const filteredComments =
    selectedCategory === "All"
      ? comments
      : comments.filter((comment) => comment.category === selectedCategory);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="signlog nv-inactive block">Loading...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="signlog nv-inactive block">Error: {error}</div>
      </div>
    );

  return (
    <div className="relative min-h-screen">
      <div className={`${showCreateModal ? "blur-md" : ""}`}>
        <div className="notescontainer p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8 mx-4">
            <h1 className="text-3xl font-bold text-white optifont nv-inactive">
              Community Forum
            </h1>
            {user && (
              <button
                onClick={toggleUserComments}
                className="hsmall nv-active transition"
              >
                {showUserCommentsOnly
                  ? "Show All Comments"
                  : "Show My Comments"}
              </button>
            )}
          </div>

          {/* Post/Login Button */}
          <div className="text-center mb-8">
            {!user ? (
              <p className="nv-active bg-red-700 text-yellow-50 rounded-full inline-block p-3 px-6">
                Please{" "}
                <a href="/login" className="underline">
                  Login
                </a>{" "}
                to post your thoughts.
              </p>
            ) : (
              <button
                onClick={() => setShowCreateModal(true)}
                className="nv-active optifont hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition"
              >
                + Share your thoughts with the community!
              </button>
            )}
          </div>

          <div className="flex gap-6">
            {/* Categories Sidebar */}
            <div className="w-1/4">
              <div className="darkcontainer bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
                <h3 className="font-bold text-xl mb-6 text-white">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((cat, index) => (
                    <li
                      key={index}
                      className={`cursor-pointer px-3 py-2 rounded-lg transition ${
                        selectedCategory === cat
                          ? "nv-active text-white"
                          : "nv-inactive text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                      onClick={() => filterByCategory(cat)}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Comments Section */}
            <div className="w-3/4">
              {filteredComments.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg">
                    No comments in this category yet.
                  </p>
                </div>
              ) : (
                <ul className="space-y-6">
                  {filteredComments.map((comment) => (
                    <li
                      key={comment._id}
                      className="bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm text-white p-6 rounded-xl shadow-lg border border-gray-700/50"
                    >
                      {/* Comment Header */}
                      <div className="flex justify-between mb-4">
                        <div className="flex items-center space-x-3 text-sm">
                          <span className="text-gray-400">
                            {new Date(comment.timestamp).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </span>
                          <span className="text-gray-500">•</span>
                          <span className="bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full text-xs">
                            {comment.category}
                          </span>
                        </div>
                        <div className="text-sm font-medium text-purple-300">
                          @{comment.username}
                        </div>
                      </div>

                      {/* Comment Body */}
                      <div className="my-4 text-gray-100 text-base leading-relaxed">
                        {comment.commentText}
                      </div>

                      {/* Comment Footer */}
                      <div className="flex justify-between items-center mt-6">
                        <div className="flex gap-3">
                          <button
                            onClick={() => handleClick(comment._id, "upvote")}
                            className={`flex items-center gap-2 bg-gray-700/50 hover:bg-green-600/30 px-4 py-2 rounded-lg transition ${
                              votedComments[comment._id]
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={votedComments[comment._id]}
                          >
                            <span className="text-lg">👍</span>
                            <span className="font-semibold">
                              {comment.votes || 0}
                            </span>
                          </button>
                          <button
                            onClick={() => handleClick(comment._id, "downvote")}
                            className={`flex items-center gap-2 bg-gray-700/50 hover:bg-red-600/30 px-4 py-2 rounded-lg transition ${
                              votedComments[comment._id]
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            disabled={votedComments[comment._id]}
                          >
                            <span className="text-lg">👎</span>
                          </button>
                        </div>
                        {user && user.uid === comment.userId && (
                          <button
                            onClick={() => handleDeleteComment(comment._id)}
                            className="text-sm nv-inactive text-white px-4 py-2 rounded-lg transition"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
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
          categories={categories.filter((cat) => cat !== "All")}
        />
      )}
    </div>
  );
};

export default CommentsList;
