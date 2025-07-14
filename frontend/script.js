const form = document.getElementById("shortenForm");
const input = document.getElementById("urlInput");
const result = document.getElementById("result");

const API_URL = "http://localhost:5000/shorten";

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const longUrl = input.value.trim();

    if (!longUrl) return;

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url: longUrl })
        });

        if (!res.ok) {
            const { error } = await res.json();
            result.innerHTML = `<p style="color:red;">${error}</p>`;
            return;
        }

        const data = await res.json();
        const shortUrl = `http://localhost:5000/shorten/${data.shortCode}`;

        result.innerHTML = `
      <p><strong>Short URL:</strong> <a href="${shortUrl}" target="_blank">${shortUrl}</a></p>
    `;
    } catch (err) {
        result.innerHTML = `<p style="color:red;">Something went wrong</p>`;
    }
});
