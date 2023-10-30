import { useState } from 'react';
import backgroundImage from "../../assets/background-join.jpeg";

export default function RequestJoin() {
  const [isJoined, setIsJoined] = useState(false);

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }
  const handleJoin = () => {
    setIsJoined(true);
  };

  const handleLogout = () => {
    setIsJoined(false);
  };

  return (
<div className="frame-join flex flex-col items-center gap-2.5 w-full bg-white">
<div className="join-background flex flex-col items-end gap-2.5 self-stretch py-11 px-16 h-[400px] text-white font-['Plus text-[3.375rem] font-bold leading-[normal]']"
  style={backgroundStyle}>
    {isJoined ? (
      <>
        Hold on tight, your Sevenify+ request is being reviewed.
      </>
    ) : (
      <>
        Share music with us, join Sevenify+
        <button
          className= "btn btn-primary text-lg font-bold px-3 py-2" 
          onClick={handleJoin}
        >
        Join Sevenify+
        </button>
      </>

    )}
  </div>
  <div className="flex flex-col items-start gap-2.5 self-stretch py-6 px-0">
    <div className="flex flex-col items-start gap-2.5 self-stretch p-2.5 p-2">
      <div className="Jakarta Sans'] self-stretch text-black font-['Plus text-4xl font-bold leading-[normal]">
        Why join Sevenify+?
      </div>
      <div className="Jakarta Sans'] self-stretch text-black font-['Plus text-lg leading-[normal]">
        Sevenify+ is a premium subscription service that offers a wide range of exclusive features designed to enhance your experience. With a Sevenify+ subscription, you gain access to premium music content, unlocking a world of high-quality tracks and personalized playlists that cater to your unique musical preferences. Our commitment to delivering exceptional music experiences ensures that you can enjoy your favorite songs with superior audio quality. But Sevenify+ doesn't stop there; it also provides other exclusive benefits that make your subscription worthwhile, ensuring you have access to a holistic package of entertainment and convenience. Join Sevenify+ today and elevate your music enjoyment to new heights.
      </div>
    </div>
    <div className="flex flex-col items-start gap-4 self-stretch p-2.5 p-2">
      <div className="Jakarta Sans'] self-stretch text-black font-['Plus text-4xl font-bold leading-[normal]">
        Log in with a different account
      </div>
      <button className="btn btn-primary text-lg font-bold px-3 py-2" onClick={handleLogout}>
        Logout
      </button>
    </div>
  </div>
</div>
  );
}