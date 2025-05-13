import { useAuth } from "../context/AuthContext";
import CreateNoteModal from "../components/createnote";
import { useNoteLogic } from "../context/noteuihelper";

const NotesList = () => {
  const { user } = useAuth();
  const {
    notes,
    showCreateModal,
    currentNote,
    handleSaveNote,
    handleDeleteNote,
    openCreateModal,
    openEditModal,
    closeModal,
  } = useNoteLogic(user);

  return (
    <div className="relative">
      <div className={`${showCreateModal ? "blur-md" : ""}`}>
        <div className="notescontainer p-4">
          <button onClick={openCreateModal} className="nv-active">
            Create a Note
          </button>
          <ul className="flex flex-wrap gap-4 justify-center">
            {notes.map((note) => (
              <li
                key={`note-${note._id}`}
                className="text-center darkcontainer  text-white font-bold p-3 rounded-lg shadow-md flex flex-col justify-between mt-4 cursor-pointer"
                style={{
                  flex: "0 1 calc(20% - 1rem)",
                  maxWidth: "calc(20% - 1rem)",
                  minHeight: "20px",
                }}
                onClick={() => openEditModal(note)}
              >
                <h6 className="text-xs text-slate-600 rounded-md p-1 inline-block mt-0">
                  {note.timestamp
                    ? new Date(note.timestamp).toLocaleString("en-GB", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Invalid Date"}
                </h6>
                <div className="flex-grow">{note.noteText || "No text"}</div>
                <div className="mt-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note._id);
                    }}
                    className="text-xs bg-red-500 text-white mt-2 py-1 px-2 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showCreateModal && (
        <CreateNoteModal
          onClose={closeModal}
          onSave={handleSaveNote}
          kind="Note"
          title={currentNote ? "Edit Note" : "Create a Note"}
          body={
            currentNote
              ? "Edit your note below:"
              : "Any crucial business flash thoughts?"
          }
          value={currentNote ? currentNote.noteText : ""}
        />
      )}
    </div>
  );
};

export default NotesList;
