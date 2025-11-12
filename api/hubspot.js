// api/hubspot.js
export default async function handler(req, res) {
  const HUBSPOT_TOKEN = process.env.HUBSPOT_API_KEY;
  const FORM_ID = "YOUR_FORM_ID"; // replace with your HubSpot form ID

  let allSubmissions = [];
  let offset = 0;
  const limit = 100; // HubSpot max per request

  try {
    while (true) {
      const response = await fetch(
        `https://api.hubapi.com/form-integrations/v1/submissions/forms/${FORM_ID}?limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${HUBSPOT_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!data.results || data.results.length === 0) break;

      allSubmissions = allSubmissions.concat(data.results);

      // Stop if fewer than limit results returned
      if (data.results.length < limit) break;

      offset += limit;
    }

    res.status(200).json({
      count: allSubmissions.length,
      submissions: allSubmissions, // full submission data
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ count: 0, error: err.message });
  }
}
