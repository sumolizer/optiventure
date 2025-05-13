import { Navbar } from "../components/Navbar";
import { Crynavbar } from "../components/crynavbar";

function Reports() {
  return (
    <>
      <Crynavbar />
      <div className="Signlog  m-5">
        {" "}
        <h1 className=" nv-active"> Generated Reports will be kept here</h1>
        <br /> <p className="optifont "> No Reports Generated Yet !</p>
      </div>
    </>
  );
}
export default Reports;
