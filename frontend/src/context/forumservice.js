export const fetchAllComments = async () => {
  try {
    const response = await fetch("http://localhost:7777/api/forum");
    if (!response.ok) throw new Error("Failed to fetch comments");
    return await response.json();
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
};

export const fetchUserComments = async (userId) => {
  try {
    const allComments = await fetchAllComments();
    return allComments.filter((comment) => comment.userId === userId);
  } catch (error) {
    console.error("Error fetching user comments:", error);
    throw error;
  }
};

export const createComment = async (userId, username, commentText) => {
  try {
    const response = await fetch("http://localhost:7777/api/forum", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, username, commentText }),
    });
    if (!response.ok) throw new Error("Failed to create comment");
    return await response.json();
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId) => {
  try {
    const response = await fetch(
      `http://localhost:7777/api/forum/${commentId}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) throw new Error("Failed to delete comment");
    return await response.json();
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};

export const voteComment = async (commentId, voteType) => {
  try {
    const response = await fetch(
      `http://localhost:7777/api/forum/${commentId}/vote`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voteType }),
      }
    );
    if (!response.ok) throw new Error("Failed to vote");
    return await response.json();
  } catch (error) {
    console.error("Error voting:", error);
    throw error;
  }
};
