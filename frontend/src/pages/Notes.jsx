import { useState } from "react";
import { Navbar } from "../components/Navbar";
import NotesList from "../components/note";
function Notes() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Handler to toggle the modal
  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
  };
  let momentsarray = [
    {
      id: 1,
      opinion: "Welcome",
      username: "Alyan",
      timestamp: "2024-07-01",
    },
    {
      id: 1,
      opinion: "to",
      username: "Alyan",
      timestamp: "2024-07-01",
    },
    {
      id: 1,
      opinion: "Opti",
      username: "Alyan",
      timestamp: "2024-07-01",
    },
    {
      id: 1,
      opinion: "Venture",
      username: "Alyan",
      timestamp: "2024-07-01",
    },
    {
      id: 1,
      opinion: "Analyze indvidual areas effortlessly",
      username: "Alyan",
      timestamp: "2024-07-01",
    },
    {
      id: 1,
      opinion: "Here you can create notes",
      username: "Alyan",
      timestamp: "2024-07-01",
    },
    {
      id: 1,
      opinion: "About any of your ventures",
      username: "Alyan",
      timestamp: "2024-07-01",
    },
    {
      id: 1,
      opinion: "Any of your entre-thoughts can belong here",
      username: "Alyan",
      timestamp: "2024-07-01",
    },
    {
      id: 1,
      opinion: "Press view to enlarge a note to edit it",
      username: "Alyan",
      timestamp: "2024-07-01",
    },
    {
      id: 1,
      opinion: "Or you can delete it aswell",
      username: "Alyan",
      timestamp: "2024-07-01",
    },
  ];
  return (
    <>
      <Navbar />
      <NotesList moments={momentsarray} />
    </>
  );
}
export default Notes;
