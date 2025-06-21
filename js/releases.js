// github-release-viewer.js
const owner = "SmirkClassCarry6J";   // ← change to my GitHub username
const repo = "pics-archive";        // ← change to my repository name
const target = document.querySelector(".github");

fetch(`https://api.github.com/repos/${owner}/${repo}/releases`)
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch release info");
    return res.json();
  })
  .then(data => {
	console.log(data);
	console.log(Array.isArray(data));
    const allAssets = data.flatMap(release => release.assets) || [];
    if (allAssets.length === 0) {
      target.innerHTML = "<li>No release assets found.</li>";
      return;
    }


	data.forEach(release => {
	console.log("Release:", release.name);
	});


	data.forEach(release => {
		const h4 = document.createElement("h4");
		h4.textContent = `${release.name || release.tag_name}`;
		target.appendChild(h4);
		const ul = document.createElement("ul");
		target.appendChild(ul);
		release.assets.forEach(asset => {
			const sizeMB = (asset.size / 1048576).toFixed(2);
			const li = document.createElement("li");
			li.innerHTML = `
				<a href="${asset.browser_download_url}" target="_blank">${asset.name}</a>
				<small>(${sizeMB} MB, updated ${new Date(asset.updated_at).toLocaleDateString()})</small>
				`;
			ul.appendChild(li);
		});
  	});
  })
  .catch(err => {
    console.error(err);
    target.innerHTML = "<li>Error loading release assets.</li>";
  });
