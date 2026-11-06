const app = document.getElementById("app");
const status = document.getElementById("settings-status");
const params = new URLSearchParams(window.location.search);

function renderProfile(user) {
    const card = document.createElement("section");
    card.className = "profile-card";

    const heading = document.createElement("h2");
    heading.textContent = `Welcome, ${params.get("name") || user.name || "Guest"}`;
    card.append(heading);

    for (const [label, value] of [
        ["Email", user.email],
        ["Role", user.role]
    ]) {
        const paragraph = document.createElement("p");
        paragraph.textContent = `${label}: ${value || "Unknown"}`;
        card.append(paragraph);
    }

    app.replaceChildren(card);
}

fetch("/api/profile")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Unable to load profile.");
        }
        return response.json();
    })
    .then(renderProfile)
    .catch(() => {
        app.textContent = "Unable to load profile.";
    });

document.getElementById("save-settings").addEventListener("click", async () => {
    const settings = {
        theme: document.getElementById("theme").value,
        language: document.getElementById("language").value,
        fontSize: document.getElementById("fontSize").value
    };

    try {
        const response = await fetch("/api/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(settings)
        });

        const result = await response.json();
        status.textContent = response.ok
            ? result.message
            : result.error || "Unable to save settings.";
    } catch {
        status.textContent = "Unable to save settings.";
    }
});
