"use client";
import { useState } from "react";
import HomePage from "@/components/Homepage/Homepage";
import Login from "@/components/Login";
import { useSession, signOut } from "next-auth/react";
import "./button.css";

export default function Page() {
  const { data: session, status } = useSession();
  const [isHovered, setIsHovered] = useState(false);
  console.log(session, "data");

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <div>
        <Login />
      </div>
    );
  }

  return (
    <>
      <div className="header">
        <h1>Welcome, {session.user.name}!</h1>
        <div
          className="profile"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            src={session.user.image}
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              marginLeft: "10px",
              cursor: "pointer",
            }}
          />
          {isHovered && (
            <button className="Btn" onClick={() => signOut()}>
              <div className="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div>Logout</div>
            </button>
          )}
        </div>
      </div>
      <HomePage />
    </>
  );
}
