export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Only GET requests allowed" });
  }

  const HUBSPOT_TOKEN = process.env.HUBSPOT_API_KEY;

  try {
    // Fetch contacts from HubSpot
    const response = await fetch(
      "https://api.hubapi.com/crm/v3/objects/contacts?limit=1",
      {
        headers: {
          Authorization: `Bearer ${HUBSPOT_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    // HubSpot API returns total results in paging info
    const total = data.paging?.total || 0;

    res.status(200).json({ count: total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ count: 0, error: err.message });
  }
}
