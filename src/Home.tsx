import React from "react";
import { auth } from "./firebase";

const Home: React.FC = () => {
  const user = auth.currentUser;

  const handleSignout = async () => {
    try {
      await auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };

  const handleApiCall = async () => {
    try {
      const idToken = await user?.getIdToken();
      const res = await fetch("http://localhost:9000/protected", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Response error ${res.status}`);
      }

      const data = await res.text();
      alert(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h2>Home</h2>
      {user?.email}
      <button onClick={handleSignout}>Logout</button>
      <button onClick={handleApiCall}>Call the API</button>
    </div>
  );
};

export default Home;
