import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import CreateNoteModal from "../components/createnote";
import { createNote, fetchNotes, deleteNote } from "../context/noteservice";

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { user } = useAuth();

  // Fetch notes on component mount
  useEffect(() => {
    if (user) {
      fetchNotes(user.uid)
        .then((data) => setNotes(data))
        .catch((error) => console.error("Error fetching notes:", error));
    }
  }, [user]);

  // Create a new note
  const handleCreateNote = (noteText) => {
    createNote(user.uid, noteText)
      .then((newNote) => {
        // Log the new note for debugging
        console.log("New note created:", newNote);

        // Option 1: Update the state with the new note
        setNotes((prev) => [...prev, newNote]);

        // Option 2: Re-fetch notes (optional, but ensures freshness)
        fetchNotes(user.uid)
          .then((data) => setNotes(data))
          .catch((error) => console.error("Error fetching notes:", error));

        setShowCreateModal(false);
      })
      .catch((error) => console.error("Error creating note:", error));
  };

  // Delete a note
  const handleDeleteNote = (noteId) => {
    deleteNote(noteId)
      .then(() =>
        setNotes((prev) => prev.filter((note) => note._id !== noteId))
      )
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <div className="relative">
      <div className={`${showCreateModal ? "blur-md" : ""}`}>
        <div className="notescontainer p-4">
          <h1 className="text-2xl p-1.2 font-extrabold">🗒️ Notes </h1>
          <button onClick={() => setShowCreateModal(true)} className="btneuro">
            +
          </button>
          <ul className="flex flex-wrap gap-4 justify-center">
            {notes.map((note) => (
              <li
                key={note._id}
                className="text-center bg-[#0a2540] text-white font-bold p-3 rounded-lg shadow-md flex flex-col justify-between"
                style={{
                  flex: "0 1 calc(20% - 1rem)",
                  maxWidth: "calc(20% - 1rem)",
                  minHeight: "200px", // Ensure a minimum height for the note to work with flex
                }}
              >
                <div className="flex-grow">{note.noteText}</div>{" "}
                {/* The note content */}
                {/* Footer with timestamp and delete button */}
                <div className="mt-0">
                  <h6 className="text-xs text-white rounded-md p-1 inline-block mt-2">
                    {new Date(note.timestamp).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      hour12: true,
                    })}{" "}
                    {new Date(note.timestamp).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </h6>
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="text-xs bg-red-500 text-white mt-2 py-1 px-2 rounded-xl"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleDeleteNote(note._id)}
                    className="text-xs bg-red-500 text-white mt-2 py-1 px-2 rounded-xl"
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showCreateModal && (
        <CreateNoteModal
          onClose={() => setShowCreateModal(false)}
          onSave={handleCreateNote}
          kind="Note"
        />
      )}
    </div>
  );
};

export default NotesList;
