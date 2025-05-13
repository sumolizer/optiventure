import { Navbar } from "../components/Navbar";
import { Crynavbar } from "../components/crynavbar";
import { useAuth } from "../context/AuthContext";
import CommentsList from "../components/dissforum";
function Forum() {
  return (
    <>
      <Crynavbar />
      <CommentsList />
    </>
  );
}
export default Forum;
