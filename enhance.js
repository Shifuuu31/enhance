(function () {
  // 1. Get the current URL
  const url = window.location.href;

  // 2. Match the exercise name between / and ?
  const match = url.match(/\/([^\/?]+)(?:\?|$)/);


  if (!match) {
    showMessage("Exercise name not found in URL", false);
    return;
  }
  const exerciseName = match[1];

  // 3. Build the new API URL
  const newUrl = `https://learn.zone01oujda.ma/api/content/root/01-edu_module/content/${exerciseName}/README.md`;

  // 4. Function to show floating message
  function showMessage(message, success = true) {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = message;
    msgDiv.style.position = "fixed";
    msgDiv.style.top = "140px";
    msgDiv.style.left = "200px";
    msgDiv.style.zIndex = "999999";
    msgDiv.style.padding = "8px 12px";
    msgDiv.style.background = success ? "#28a745" : "#dc3545";
    msgDiv.style.color = "white";
    msgDiv.style.borderRadius = "5px";
    msgDiv.style.boxShadow = "0 0 6px rgba(0,0,0,0.2)";
    msgDiv.style.fontSize = "13px";
    msgDiv.style.opacity = "0.95";
    document.body.appendChild(msgDiv);
    setTimeout(() => msgDiv.remove(), 3000);
  }

  // 5. Wait for the div[data-test="files"] to exist
  const waitForFilesDiv = setInterval(() => {
    const filesDiv = document.querySelector('div[data-test="files"]');
    if (filesDiv) {
      clearInterval(waitForFilesDiv);

      const fileContent = filesDiv.textContent.trim();
      if (!fileContent) {
        showMessage("No file content to copy ❌", false);
      } else {
        navigator.clipboard.writeText(fileContent)
          .then(() => showMessage(`File copied: ${fileContent} ✅`))
          .catch(err => {
            console.error(err);
            showMessage("Failed to copy file content ❌", false);
          });
      }
    }
  }, 200); // check every 200ms

  // 6. Create the button element
  const btn = document.createElement("button");
  btn.textContent = "Open Exercise API";
  btn.style.position = "fixed";
  btn.style.top = "80px";
  btn.style.left = "200px";
  btn.style.zIndex = "999999";
  btn.style.padding = "10px 15px";
  btn.style.background = "#0066ff";
  btn.style.color = "white";
  btn.style.border = "none";
  btn.style.borderRadius = "6px";
  btn.style.cursor = "pointer";
  btn.style.fontSize = "14px";
  btn.style.boxShadow = "0 0 6px rgba(0,0,0,0.2)";
  btn.onclick = () => window.open(newUrl, "_blank");

  document.body.appendChild(btn);
})();
