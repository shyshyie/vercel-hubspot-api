// api/hubspot.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  try {
    // Example: receive form data from Webflow
    const { email, firstName, lastName } = req.body;

    // Replace this with your actual HubSpot API key or token
    const HUBSPOT_API_KEY = process.env.HUBSPOT_API_KEY;

    // Example of sending data to HubSpot
    const response = await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${HUBSPOT_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          email,
          firstname: firstName,
          lastname: lastName,
        },
      }),
    });

    const data = await response.json();
    res.status(200).json({ message: "Contact created!", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating contact", error });
  }
}
