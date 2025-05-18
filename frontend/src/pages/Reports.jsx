import { Navbar } from "../components/Navbar";
import { Crynavbar } from "../components/crynavbar";
import { useLocation } from "react-router-dom";

function Reports() {
  const ReportGeneration = () => {
    const location = useLocation();
    const data = location.state;
    console.log(data);
    // Use data to generate report
  };
  return (
    <>
      <Crynavbar />
      <div className="Signlog  m-5">
        {" "}
        <h1 className=" nv-active"> Generate from Home</h1>
        <br />{" "}
        <p className="optifont ">
          {" "}
          Reports carry detailed business statistics about the area you selected
          ! !
        </p>
      </div>
    </>
  );
}
export default Reports;
