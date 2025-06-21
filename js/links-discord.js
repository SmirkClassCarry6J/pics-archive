fetch("./datasets/dataset-discord.json")
  .then(res => {
	if (!res.ok) throw new Error("Failed to fetch Discord dataset");
	return res.json();
  })
  .then(data => {
	const target = document.querySelector(".discord");
	if (!data || data.groups.length === 0) {
		const h4 = document.createElement("h4");
		h4.textContent = "No dataset found.";
	  	target.appendChild(h4);
	  	return;
	}

	console.log(data);
	console.log(Array.isArray(data.groups));

	data.groups.forEach(group => {
		const h4 = document.createElement("h4");
		h4.textContent = "." + group.name || "Untitled";
		target.appendChild(h4);
		const ulName = document.createElement("ul");
		target.appendChild(ulName);
		group.sets.forEach(set => {
			const liName = document.createElement("li");
			liName.innerHTML = set.name || "Untitled";
			ulName.appendChild(liName);
			const ulLink = document.createElement("ul");
			liName.appendChild(ulLink);
			set.links.forEach(link => {
				const linkLength = 100;
				let shortLink = "";
				if (link.length > linkLength) {
					shortLink = link.slice(0, linkLength) + "...";
				};
				const liLink = document.createElement("li");
				liLink.innerHTML = `<a href="${link}" target="_blank">${shortLink || "Untitled"}</a>`;
				ulLink.appendChild(liLink);
			});
		});
	});


  })
  .catch(err => {
	console.error(err);
	document.querySelector(".discord").innerHTML = "<li>Error loading Discord dataset.</li>";
  });