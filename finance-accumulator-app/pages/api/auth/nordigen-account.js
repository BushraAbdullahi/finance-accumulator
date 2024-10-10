import NordigenClient from "nordigen-node";

export default async function handler(req, res) {
  const { requisitionId } = req.query;
  try {
    const client = new NordigenClient({
      secretId: process.env.GO_CARDLESS_SECRET_ID,
      secretKey: process.env.GO_CARDLESS_SECRET_KEY,
    });
    console.log("nordigen-account.js requisition id:", requisitionId);

    const tokenData = await client.generateToken();
    client.token = tokenData.access;

    const requisitionData = await client.requisition.getRequisitionById(
      requisitionId
    );

    if (requisitionData.accounts.length > 0) {
      const accountId = requisitionData.accounts[0]; 
      res.status(200).json({ accountId }); 
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
