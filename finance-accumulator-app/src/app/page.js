"use client";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const router = useRouter();

  const fetchInstitutions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/nordigen-institutions");
      const data = await response.json();

      if (response.ok) {
        setInstitutions(data.institutions);
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

  const handleSubmitBank = async () => {
    if (selectedBank) {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/nordigen-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            institutionId: selectedBank,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("requisitionId", data.requisitionId);

          window.location.href = data.link;
        } else {
          setError("Failed to initiate bank session");
        }
      } catch (err) {
        console.error("Error initiating bank session:", err);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Please select a bank");
    }
  };

  if (!session) {
    return (
      <div>
        <h1>You are not signed in</h1>
        <a onClick={() => signIn({ callbackUrl: "/" })}>Sign in</a>
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
