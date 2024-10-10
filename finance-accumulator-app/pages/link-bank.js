import { useState, useEffect } from "react";

export default function LinkBank() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBank, setSelectedBank] = useState(""); 

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
