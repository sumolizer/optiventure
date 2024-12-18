import { useState } from "react";
import "../assets/forum.css";
import CreateNoteModal from "../components/createnote";

const NotesList = ({ moments }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };

  return (
    <div className="relative">
      <div className={`${showCreateModal ? "blur-md" : ""}`}>
        <div className="notescontainer p-4">
          <h1 className="text-2xl p-1.2 font-extrabold">🗒️ Notes </h1>
          <button onClick={toggleCreateModal} className="btneuro">
            +
          </button>
          <ul className="flex flex-wrap gap-4 justify-center">
            {moments.map((moment) => (
              <li
                key={moment.id}
                className="text-center bg-[#0a2540] text-white font-bold p-3 rounded-lg shadow-md"
                style={{
                  flex: "0 1 calc(20% - 1rem)", // Makes 5 cards per row
                  maxWidth: "calc(20% - 1rem)",
                }}
              >
                <div>{moment.opinion} </div>
                <h1 className="text-xs bg-green-600 text-white rounded-md p-1 inline-block mt-2">
                  {moment.timestamp}
                </h1>
                <a
                  href={`/euro/${moment._id}`}
                  className="inline-block text-xs bg-yellow-400 text-black mt-2 py-1 px-1 rounded-xxl"
                >
                  VIEW
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Render Create Note Modal */}
      {showCreateModal && <CreateNoteModal onClose={toggleCreateModal} />}
    </div>
  );
};

export default NotesList;
