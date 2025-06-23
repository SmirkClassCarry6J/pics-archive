fetch("/.netlify/functions/netlify-hello")
  .then(res => res.json())
  .then(data => console.log(data.message));

fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .catch(() => ({ ip: "unknown" }))
  .then(ipData => {
	let ip = ipData.ip
	if (ip === "127.0.0.1"){
		ip = "localhost (dev)";
	}
	fetch(`https://ipapi.co/${ip}/json/`)
	  .then(res => res.json())
	  .catch(() => ({ geo: "unknown"}))
	  .then(geoData => {
		  /* console.log(geoData); */
		  fetch("/.netlify/functions/netlify-visit-logger", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
			  url: location.href,
			  userAgent: navigator.userAgent,
			  time: new Date().toISOString(),
			  ip: ipData.ip,
			  geo: geoData
			})
		  });
		})
		  .then(res => res.json())
		  .then(data => console.log(data.message));
	  })
