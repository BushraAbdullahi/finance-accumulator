import { useEffect, useState } from "react";

export default function Callback() {
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requisitionId = localStorage.getItem("requisitionId"); // Retrieve requisitionId from local storage

    if (requisitionId) {
      console.log("Requisition ID from local storage:", requisitionId);

      const fetchAccountData = async () => {
        try {
          // Fetch account data using the requisitionId
          const response = await fetch(
            `/api/auth/nordigen-account-data?requisitionId=${requisitionId}`
          );
          const data = await response.json();

          if (response.ok) {
            setAccountData(data); // Store the fetched account data
          } else {
            setError(data.error || "Failed to fetch account data");
          }
        } catch (err) {
          console.error("Error fetching account data:", err);
          setError(`Something went wrong: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };

      fetchAccountData();
    } else {
      setError("Requisition ID not found in local storage");
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Account Data</h1>
      <pre>{JSON.stringify(accountData, null, 2)}</pre>
    </div>
  );
}
