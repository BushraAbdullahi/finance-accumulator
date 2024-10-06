import NordigenClient from "nordigen-node";

export default async function handler(req, res) {
  const { requisitionId } = req.query;
  try {
    // Initialize Nordigen client with the correct credentials
    const client = new NordigenClient({
      secretId: process.env.GO_CARDLESS_SECRET_ID,
      secretKey: process.env.GO_CARDLESS_SECRET_KEY,
    });
    console.log("nordigen-account.js requisition id:", requisitionId);

    // Generate a token and set it
    const tokenData = await client.generateToken();
    client.token = tokenData.access;

    // Fetch requisition details by ID
    const requisitionData = await client.requisition.getRequisitionById(
      requisitionId
    );

    // Check if the requisition contains accounts
    if (requisitionData.accounts.length > 0) {
      const accountId = requisitionData.accounts[0]; // Get the first account ID
      res.status(200).json({ accountId }); // Return the account ID
    } else {
      res
        .status(404)
        .json({ error: "No accounts found for this requisition ID" });
    }
  } catch (error) {
    console.error("Error fetching account data:", error);
    res.status(500).json({ error: "Error fetching account data" });
  }
}
