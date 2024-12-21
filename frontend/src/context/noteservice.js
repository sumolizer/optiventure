// Example of how the createNote function could look
export const createNote = async (userId, noteText) => {
  try {
    const response = await fetch("http://localhost:7777/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        noteText: noteText,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create note");
    }

    const newNote = await response.json();
    return newNote; // Return the newly created note
  } catch (error) {
    console.error("Error creating note:", error);
    throw error;
  }
};

export const fetchNotes = async (userId) => {
  try {
    const response = await fetch(
      `http://localhost:7777/api/notes?userId=${userId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch notes");
    }

    return await response.json(); // Return fetched notes
  } catch (error) {
    console.error("Error fetching notes:", error.message);
    throw error;
  }
};

export const updateNote = async (noteId, updatedNote) => {
  try {
    const response = await fetch(`http://localhost:7777/api/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedNote),
    });

    if (!response.ok) {
      throw new Error("Failed to update note");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating note:", error);
    throw error;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(`http://localhost:7777/api/notes/${noteId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete note");
    }

    return await response.json(); // Return success confirmation
  } catch (error) {
    console.error("Error deleting note:", error.message);
    throw error;
  }
};
