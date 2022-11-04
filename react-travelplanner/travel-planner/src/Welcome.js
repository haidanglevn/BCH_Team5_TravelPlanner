import "./Welcome.css";
const Welcome = () => {
  return (
    <div className="welcome">
      <img
        id="user-avatar"
        src="https://source.unsplash.com/500x400/?face"
        alt="user avatar"
      />
      <p>
        Hello, <br />
        David
      </p>
    </div>
  );
};

export default Welcome;
