// pages/api/nordigen-session.js
import NordigenClient from "nordigen-node";
import { v4 as uuidv4 } from "uuid"; // To generate a unique reference ID

export default async function handler(req, res) {
  const { institutionId } = req.body;

  console.log("Received Institution ID:", institutionId); // Debugging

  if (!institutionId) {
    return res.status(400).json({ error: "Missing institutionId" });
  }

  try {
    // Initialize Nordigen client with correct environment variables
    const client = new NordigenClient({
      secretId: process.env.GO_CARDLESS_SECRET_ID,
      secretKey: process.env.GO_CARDLESS_SECRET_KEY,
    });

    // Generate new access token (valid for 24 hours)
    const tokenData = await client.generateToken();
    client.token = tokenData.access; // Set the token for further requests

    // Initialize a new bank session with the selected institution
    const session = await client.initSession({
      redirectUrl: process.env.GO_CARDLESS_REDIRECT_URL, // Correct Nordigen redirect URL
      institutionId: institutionId, // Bank institution ID from user selection
      referenceId: uuidv4(), // Unique reference ID for this session
    });

    // Send the authorization link and requisition ID to the client
    res.status(200).json({
      link: session.link, // This is the link the user will visit to authorize
      requisitionId: session.id, // Store this ID to later get account information
    });

    console.log("Generated Requisition ID:", session.id); // Log the generated requisition ID
  } catch (error) {
    console.error("Error during Nordigen session initialization:", error); // Log the error
    res.status(500).json({ error: "Something went wrong" });
  }
}
