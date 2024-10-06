// pages/api/nordigen-institutions.js
import NordigenClient from "nordigen-node";

export default async function handler(req, res) {
  try {
    const client = new NordigenClient({
      secretId: process.env.GO_CARDLESS_SECRET_ID,
      secretKey: process.env.GO_CARDLESS_SECRET_KEY,
    });

    // Generate a new access token (valid for 24 hours)
    const tokenData = await client.generateToken();
    client.token = tokenData.access; // Set the token

    // Fetch available institutions for a specific country (e.g., Latvia, country code "LV")
    const institutions = await client.institution.getInstitutions({
      country: "GB",
    });

    res.status(200).json({ institutions });
  } catch (error) {
    console.error("Error fetching institutions:", error);
    res.status(500).json({ error: "Failed to fetch institutions" });
  }
}
