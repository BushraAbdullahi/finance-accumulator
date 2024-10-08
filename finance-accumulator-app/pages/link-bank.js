import { useState, useEffect } from "react";

export default function LinkBank() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBank, setSelectedBank] = useState(""); // State to store the selected bank

  useEffect(() => {
    const bank = sessionStorage.getItem("selectedBank");
    if (bank) {
      setSelectedBank(bank);
    } else {
      setError("No bank selected");
    }
  }, []);

  const handleLinkBank = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call the API route to initiate the session and get the link
      const response = await fetch("/api/nordigen-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          institutionId: selectedBank, // Use the bank selected in page.js
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect the user to the bank authorization link
        window.location.href = data.link;
      } else {
        setError("Failed to initiate bank session");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Link Your Bank Account</h1>
      <button onClick={handleLinkBank} disabled={loading || !selectedBank}>
        {loading ? "Loading..." : "Link Bank Account"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
