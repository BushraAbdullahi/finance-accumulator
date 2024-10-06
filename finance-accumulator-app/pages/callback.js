import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Callback() {
  const router = useRouter();
  const { ref: requisitionId } = router.query; // Make sure you're capturing the requisition ID from the query
  console.log("Callback Requisition ID:", requisitionId);
  const [loading, setLoading] = useState(true);
  const [accountData, setAccountData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      if (!requisitionId) return; // Use requisitionId here

      try {
        // Fetch account data using the requisitionId
        const response = await fetch(
          `/api/auth/nordigen-account-data?requisitionId=${requisitionId}` // Use requisitionId here
        );

        const data = await response.json();

        if (response.ok) {
          setAccountData(data); // Store the fetched account data
        } else {
          setError(data.error || "Failed to fetch account data");
        }
      } catch (err) {
        console.error("Error fetching account data:", err); // Log detailed error
        setError(`Something went wrong: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [requisitionId]); // Use requisitionId in the dependency array

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h1>Account Data</h1>
      <pre>{JSON.stringify(accountData, null, 2)}</pre>{" "}
      {/* Display the account data */}
    </div>
  );
}
