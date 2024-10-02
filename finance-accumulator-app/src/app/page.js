// src/app/page.js
"use client"; // Add this line to mark this file as a Client Component

import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div>
        <h1>You are not signed in</h1>
        <a href="/auth/signin">Sign in</a>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to the Home Page, {session.user.name}!</h1>
      <p>Email: {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}
