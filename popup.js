const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("username");
const resultBox = document.getElementById("result");
const errorBox = document.getElementById("error");
const loader = document.getElementById("loader");

searchBtn.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  resultBox.innerHTML = "";
  errorBox.textContent = "";

  if (!username) {
    errorBox.textContent = "Please enter a GitHub username.";
    return;
  }

  loader.style.display = "block";

  fetch(`https://api.github.com/users/${username}/repos`)
    .then((response) => {
      if (!response.ok) throw new Error("User not found or API error");
      return response.json();
    })
    .then((data) => {
      loader.style.display = "none";

      if (data.length === 0) {
        resultBox.innerHTML = "<p>No public repositories found.</p>";
        return;
      }

      const totalRepoLine = document.createElement("p");
      totalRepoLine.innerHTML = `<strong>Total Repositories:</strong> ${data.length}`;
      totalRepoLine.style.marginBottom = "10px";
      resultBox.appendChild(totalRepoLine);

      data.forEach((repo) => {
        const repoDiv = document.createElement("div");
        repoDiv.className = "repo";
        repoDiv.innerHTML = `
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      <p>${repo.description || "No description available"}</p>
      <small>⭐ ${repo.stargazers_count} | 🧠 ${repo.language || "N/A"}</small>
    `;
        resultBox.appendChild(repoDiv);
      });
    })

    .catch((err) => {
      loader.style.display = "none";
      errorBox.textContent = err.message || "Something went wrong.";
    });
});
