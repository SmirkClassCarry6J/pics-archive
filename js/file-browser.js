let fileListData = {};  // Will hold the file list

function fetchFileList() {
    fetch("./datasets/file-list.json")
    .then(res => res.json())
    .then(data => {
        fileListData = data;
        loadFiles("");  // Load root directory
    })
    .catch (error => {
        console.error("Failed to load file list:", error);
    });
}

function loadFiles(path) {
    let folder = fileListData;
    if (path) {
        const parts = path.split("/");
        for (let part of parts) {
            folder = folder.items.find(item => item.name === part && item.type === "folder");
        }
    }

    if (folder && folder.items) {
        displayFiles(folder.items, path);
    }
}

function displayFiles(items, path) {
    const fileListContainer = document.getElementById("file-list");
    fileListContainer.innerHTML = "";

    if (path) {
        fileListContainer.innerHTML += `<li class="folder" onclick="loadFiles('')">⬅ Back</li>`;
    }

    items.forEach(item => {
        const element = document.createElement("li");
        element.className = item.type;
        element.innerHTML = item.type === "folder" ? `📁 <span class="folderlink">${item.name}</span>` : `📄 <a href="Archive/${path ? `${path}/` : ""}${item.name}" target="_blank">${item.name}</a>`;
        element.onclick = () => {
            if (item.type === "folder") {
                loadFiles(path ? `${path}/${item.name}` : item.name);
            }
        };
        fileListContainer.appendChild(element);
    });
}

fetchFileList();