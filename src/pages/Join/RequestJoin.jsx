import { useState } from 'react';
import backgroundImage from "../../assets/background-join.jpeg";

export default function RequestJoin() {
  const [isJoined, setIsJoined] = useState(false); // Initial State : user not joined

  // Check is user join
  const handleJoin = () => {
    // Check is user join
    // setIsJoined(true);
  };

  // Logout function
  const handleLogout = () => {
    // Logout user
    // setIsJoined(false);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md bg-white p-8">
        {isJoined ? ( // User joined
          <h1 className="text-4xl font-bold text-gray-900">
            Hold on tight, your Sevenify+ request is being reviewed.
          </h1>
        ) : ( // User not joined
          <>
            <h1 className="text-4xl font-bold text-gray-900">
              Share music with us, join Sevenify+
            </h1>
            <button
              className="mt-4 btn"
              onClick={handleJoin}
            >
                Join Sevenify+
            </button>
          </>
        )}
        <p className="mt-8 text-lg text-gray-600">Why join Sevenify+?</p>
        <p className="mt-2 text-gray-600">
          Sevenify+ is a premium subscription service that offers a wide range of exclusive features designed to enhance your experience.
        </p>
        <div className="flex justify-between mt-8">
          <button className="mt-4 btn" onClick={handleLogout}>
            Logout
          </button>
          <p className="mt-4 text-sm text-gray-600">
            Login with a different account
          </p>
        </div>
      </div>
    </div>
  );
}
