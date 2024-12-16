function LocForum() {
  return (
    <div>
      <h1>Start your Venture !</h1>
      {/* Forum content goes here */}
      <form>
        <label className="signlbl" htmlFor="Username">
          Enter Location
        </label>
        <br />
        <input type="text" placeholder="Coordinates" className="signinp" />
        <br />
        <label className="signlbl" htmlFor="Username">
          {" "}
          Enter Radius
        </label>
        <br />
        <input type="email" placeholder="1-1000 Meters" className="signinp" />
        <br />
        <button className="btnsign" type="submit">
          Find Location
        </button>
      </form>
      <br />
      <button className="btneuro"> Analyse </button>
    </div>
  );
}

export default LocForum;
