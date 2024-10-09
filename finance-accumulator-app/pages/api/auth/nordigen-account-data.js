import NordigenClient from "nordigen-node";

export default async function handler(req, res) {
  const { requisitionId } = req.query;
  if (!requisitionId) {
    return res.status(400).json({ error: "Missing requisitionId" });
  }

  try {
    console.log("Initializing Nordigen client...");
    const client = new NordigenClient({
      secretId: process.env.GO_CARDLESS_SECRET_ID,
      secretKey: process.env.GO_CARDLESS_SECRET_KEY,
    });

    const tokenData = await client.generateToken();
    client.token = tokenData.access;
    console.log("Nordigen token generated:", tokenData.access); 

    console.log("nordigen-account-data.js requisition id:", requisitionId);
    const requisitionData = await client.requisition.getRequisitionById(
      requisitionId
    );

    const accountId = requisitionData.accounts[0];

    if (!accountId) {
      return res
        .status(404)
        .json({ error: "No accounts found for this requisition ID" });
    }

    console.log("Fetching account details for accountId:", accountId); 
    const account = client.account(accountId);
    const metadata = await account.getMetadata();
    const balances = await account.getBalances();
    const details = await account.getDetails();
    const transactions = await account.getTransactions();

    console.log("Fetched account data successfully"); 
    res.status(200).json({
      metadata,
      balances,
      details,
      transactions,
    });
  } catch (error) {
    console.error("Error fetching account data:", error); 
    res
      .status(500)
      .json({ error: `Error fetching account data: ${error.message}` });
  }
}
