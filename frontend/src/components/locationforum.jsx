function LocForum() {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <h1 className="text-2xl font-bold mb-6">Start Your Venture!</h1>

      {/* Forum Content */}
      <form className="flex flex-col items-center space-y-4">
        {/* Location Input */}
        <label className="signlbl" htmlFor="location">
          Enter Location
        </label>
        <input
          type="text"
          placeholder="Coordinates"
          className="signinp w-80 p-2 rounded border"
        />

        {/* Radius Input */}
        <label className="signlbl" htmlFor="radius">
          Enter Radius
        </label>
        <input
          type="number"
          placeholder="1-1000 Meters"
          className="signinp w-80 p-2 rounded border"
        />

        {/* Find Location Button */}
        <br />
        <h6 className=" text-white text-sm">
          *Only avalaible in Islamabad Capital Territory as of now
        </h6>
        <button className="btnsign w-40 p-2 rounded" type="submit">
          Find Location
        </button>
        <br />
      </form>

      {/* Analyse Button */}
      <button className="btneuro text-2xl">Analyse</button>
    </div>
  );
}

export default LocForum;
