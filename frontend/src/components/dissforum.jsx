import { useState } from "react";
import "../assets/forum.css";
import CreateNoteModal from "./createnote";
import { useAuth } from "../context/AuthContext";
const CommentsList = ({ moments }) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };
  const { user } = useAuth();
  return (
    <div className="relative">
      <div className={`${showCreateModal ? "blur-md" : ""}`}>
        <div className="notescontainer p-4">
          <h1 className="text-2xl p-1.2 font-extrabold">
            🗒️ Disscussion Forum{" "}
          </h1>
          <br />
          {!user ? (
            <p className="btnsign  bg-red-700  text-yellow-50 rounded-full inline-block p-1 px-2 mx-9 align-middle">
              Please <a href="/login">Login</a> to post your thoughts.
            </p>
          ) : (
            <button onClick={toggleCreateModal} className="btnsign">
              + Share your thoughts with the community !
            </button>
          )}

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
                <h3 className="inline-block text-xs bg-yellow-400 text-black mt-2 py-1 px-1 rounded-xl">
                  {moment.username}
                </h3>
                <button>👍{moment.votes}</button>
                <button>👎</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {showCreateModal && (
        <CreateNoteModal onClose={toggleCreateModal} kind="Comment" />
      )}
    </div>
  );
};

export default CommentsList;
