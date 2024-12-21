import { useState, useEffect } from "react";
import {
  createNote,
  fetchNotes,
  deleteNote,
  updateNote,
} from "../context/noteservice";

export const useNoteLogic = (user) => {
  const [notes, setNotes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    if (user) {
      fetchNotes(user.uid)
        .then((data) => setNotes(data))
        .catch((error) => console.error("Error fetching notes:", error));
    }
  }, [user]);

  const handleSaveNote = async (noteText) => {
    try {
      if (currentNote) {
        const updatedNote = { ...currentNote, noteText };
        await updateNote(currentNote._id, updatedNote);
        setNotes((prev) =>
          prev.map((note) =>
            note._id === currentNote._id ? updatedNote : note
          )
        );
      } else {
        const timestamp = new Date().toISOString();
        // eslint-disable-next-line no-unused-vars
        const newNoteData = {
          noteText,
          timestamp,
          userId: user.uid,
        };

        const newNote = await createNote(user.uid, noteText);
        const completeNote = {
          ...newNote,
          noteText,
          timestamp: newNote.timestamp || timestamp,
        };

        setNotes((prev) => [...prev, completeNote]);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }

    setShowCreateModal(false);
    setCurrentNote(null);
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId)
      .then(() =>
        setNotes((prev) => prev.filter((note) => note._id !== noteId))
      )
      .catch((error) => console.error("Error deleting note:", error));
  };

  const openCreateModal = () => {
    setCurrentNote(null);
    setShowCreateModal(true);
  };

  const openEditModal = (note) => {
    setCurrentNote(note);
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setCurrentNote(null);
  };

  return {
    notes,
    showCreateModal,
    currentNote,
    handleSaveNote,
    handleDeleteNote,
    openCreateModal,
    openEditModal,
    closeModal,
  };
};
