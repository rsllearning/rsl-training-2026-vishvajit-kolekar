const profile = document.getElementById("accountProfile");
const status = document.getElementById("status");

fetch("/api/profile")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Unable to load account.");
    }
    return response.json();
  })
  .then((user) => {
    profile.replaceChildren();

    for (const [label, value] of [
      ["Name", user.name],
      ["Email", user.email],
      ["Role", user.role],
    ]) {
      const para = document.createElement("p");
      const strongLabel = document.createElement("strong");
      strongLabel.textContent = `${label}: `;
      para.append(strongLabel, document.createTextNode(value || "Unknown"));
      profile.append(para);
    }
  })
  .catch(() => {
    profile.textContent = "Unable to load account.";
  });

document.getElementById("delete-account").addEventListener("click", () => {
  status.textContent = "Account deletion action triggered.";
});
