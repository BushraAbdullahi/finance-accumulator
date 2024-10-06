"use client"; // Mark this as a client component

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation"; 

export default function Home() {
  const { data: session } = useSession(); // Get session data (e.g., user's name and email)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [institutions, setInstitutions] = useState([]); // State to store fetched institutions
  const [selectedBank, setSelectedBank] = useState(""); // State to store the selected bank
  const router = useRouter(); // Initialize the router

  // Renamed function: Fetch available institutions
  const fetchInstitutions = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch available institutions for a specific country code (e.g., "LV" for Latvia)
      const response = await fetch("/api/nordigen-institutions");
      const data = await response.json();

      if (response.ok) {
        setInstitutions(data.institutions); // Store the list of institutions in state
      } else {
        setError("Failed to fetch institutions");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching institutions");
    } finally {
      setLoading(false);
    }
  };

  // Function to navigate to link-bank.js when the user is ready to link their bank
  const handleSubmitBank = () => {
    if (selectedBank) {
      // Save the selected bank in sessionStorage or pass it via URL params if needed
      sessionStorage.setItem("selectedBank", selectedBank);
      // Navigate the user to /auth/link-bank to complete the bank linking
      router.push("/link-bank");
    } else {
      setError("Please select a bank");
    }
  };

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

      <div>
        <h2>Link Your Bank Account</h2>
        {!institutions.length ? (
          <button onClick={fetchInstitutions} disabled={loading}>
            {loading ? "Loading..." : "Link Bank Account"}
          </button>
        ) : (
          <div>
            <h3>Select Your Bank</h3>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
            >
              <option value="">-- Select a Bank --</option>
              {institutions.map((institution) => (
                <option key={institution.id} value={institution.id}>
                  {institution.name}
                </option>
              ))}
            </select>

            {selectedBank && (
              <button onClick={handleSubmitBank} disabled={loading}>
                {loading ? "Loading..." : "Submit Bank"}
              </button>
            )}
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}
