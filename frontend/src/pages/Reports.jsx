import { Navbar } from "../components/Navbar";

function Reports() {
  return (
    <>
      <Navbar />
      <div className="Signlog  m-5">
        {" "}
        <h1> Generated Reports will be kept here</h1>
        <br />{" "}
        <p className="bg-red-700  text-yellow-50 rounded-full inline-block p-1 px-2 mx-9">
          {" "}
          No Reports Generated Yet !
        </p>
      </div>
    </>
  );
}
export default Reports;
