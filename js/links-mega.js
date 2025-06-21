fetch("./datasets/dataset-mega.json")
  .then(res => {
	if (!res.ok) throw new Error("Failed to fetch links");
	return res.json();
  })
  .then(data => {
	const target = document.querySelector(".mega");
	if (!data || data.length === 0) {
	  target.innerHTML = "<li>No links found.</li>";
	  return;
	}

	console.log(data);
	console.log(Array.isArray(data.links));
	console.log(data.links[0])

	const ul = document.createElement("ul");
	target.appendChild(ul);
	data.links.forEach(link => {
		const li = document.createElement("li");
		li.innerHTML = `
			<a href="${link}" target="_blank">${link}</a>
		`
		ul.appendChild(li);
	})

  })
  .catch(err => {
	console.error(err);
	document.querySelector(".links-mega").innerHTML = "<li>Error loading links.</li>";
  });