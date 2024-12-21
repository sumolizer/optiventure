import { useState, useEffect } from "react";
import {
  fetchAllComments,
  createComment,
  deleteComment,
  voteComment,
  fetchUserComments,
} from "../context/forumservice";

export const useForumLogic = (user) => {
  const [comments, setComments] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUserCommentsOnly, setShowUserCommentsOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadComments = async () => {
    try {
      setIsLoading(true);
      const data =
        showUserCommentsOnly && user
          ? await fetchUserComments(user.uid)
          : await fetchAllComments();
      setComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments();
  }, [showUserCommentsOnly, user]);

  const handleCreateComment = async (commentText) => {
    try {
      const result = await createComment(
        user.uid,
        user.displayName,
        commentText
      );
      if (result.success) {
        setComments((prev) => [...prev, result.comment]);
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
    setShowCreateModal(false);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments((prev) =>
        prev.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleVote = async (commentId, voteType) => {
    try {
      const result = await voteComment(commentId, voteType);
      if (result.success) {
        setComments((prev) =>
          prev.map((comment) =>
            comment._id === commentId ? result.comment : comment
          )
        );
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const toggleUserComments = () => {
    setShowUserCommentsOnly(!showUserCommentsOnly);
  };

  return {
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
  };
};
