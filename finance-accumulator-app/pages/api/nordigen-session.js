import NordigenClient from "nordigen-node";
import { v4 as uuidv4 } from "uuid";

export default async function handler(req, res) {
  const { institutionId } = req.body;

  console.log("Received Institution ID:", institutionId); 

  if (!institutionId) {
    return res.status(400).json({ error: "Missing institutionId" });
  }

  try {
    const client = new NordigenClient({
      secretId: process.env.GO_CARDLESS_SECRET_ID,
      secretKey: process.env.GO_CARDLESS_SECRET_KEY,
    });

    const tokenData = await client.generateToken();
    client.token = tokenData.access; 

    const session = await client.initSession({
      redirectUrl: process.env.GO_CARDLESS_REDIRECT_URL, 
      institutionId: institutionId, 
      referenceId: uuidv4(),
    });

    res.status(200).json({
      link: session.link, 
      requisitionId: session.id, 
    });

    console.log("Generated Requisition ID:", session.id); 
  } catch (error) {
    console.error("Error during Nordigen session initialization:", error); 
    res.status(500).json({ error: "Something went wrong" });
  }
}
