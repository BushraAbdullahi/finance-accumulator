"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { fetchInstitutions } from "src/app/utils/fetchInstitutions"; 
import { handleSubmitBank as submitBank } from "src/app/utils/handleSubmitBank"; 

export default function Home() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [institutions, setInstitutions] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");

  const handleFetchInstitutions = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchInstitutions();
      setInstitutions(data);
    } catch (error) {
      setError("Something went wrong while fetching institutions");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitBank = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await submitBank(selectedBank); 
      localStorage.setItem("requisitionId", data.requisitionId);
      window.location.href = data.link; 
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
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
          <button onClick={handleFetchInstitutions} disabled={loading}>
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
