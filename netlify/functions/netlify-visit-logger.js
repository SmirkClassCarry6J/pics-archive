exports.handler = async function(event) {
  const data = JSON.parse(event.body || "{}");

  const payload = {
    content: `👤 New visitor:\n• URL: ${data.url}\n• UA: ${data.userAgent}\n• Time: ${data.time}\n• IP: ${data.ip}\n• City: ${data.geo.city}\n• Region: ${data.geo.region}\n• Country: ${data.geo.country}\n• Postal: ${data.geo.postal}\n• Latitude: ${data.geo.latitude}\n• Longitude: ${data.geo.longitude}`
  };

  const response = await fetch("https://discord.com/api/webhooks/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return {
    statusCode: response.ok ? 200 : 500,
    body: JSON.stringify({ success: response.ok, message: event.body })
  };
}
