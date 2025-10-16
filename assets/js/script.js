const songs = [
  { title: "Zack Merci, Arcana - Love Potion", link: "https://youtu.be/3ZTtq8-4vck?si=OX_QM_CdqJF0qNt1", instrumental: 9, vocal: 8.5, bass: 8 },
  { title: "JENNIE - SOLO", link: "https://youtu.be/b73BI9eUkjM?si=LbhAN7TWNmsbVknC", instrumental: 8, vocal: 9, bass: 8 },
  { title: "Steve Aoki & Alan Walker - Are You Lonely", link: "https://youtu.be/Wrgp3Rp1kPY?si=ZHgE0cmplUVfSzVO", instrumental: 5, vocal: 7, bass: 9 },
  { title: "Alan Walker & Emma Steinbakken - Not You", link: "https://youtu.be/D9OqPrZEo7s?si=8uktaZxcm5Pf1c3N", instrumental: 7, vocal: 8, bass: 7 },
  { title: "Unknown Brain - Faceless", link: "https://youtu.be/mbyHbZ0-UXo?si=dZhocARcW_Eb5hdf", instrumental: 8, vocal: 7, bass: 8 },
  { title: "NEFFEX - Chance", link: "https://youtu.be/HMbZi5W88mI?si=ATiHVxNewJdkRLef", instrumental: 7, vocal: 7, bass: 9 },
  { title: "Karigan Reggae Drummer", link: "https://youtu.be/pEUiCjZsaW0?si=H65qlMe_Nxx5aPQb", instrumental: 9.5, vocal: 0, bass: 9.5 },
  { title: "Cokelat - Bendera Drum Cover By Tarn Softwhip", link: "https://youtu.be/aJ4Ls35_VDA?si=UW0W_s0e6iPBbRCg", instrumental: 6, vocal: 4, bass: 9 },
  { title: "Lucky Luke - WONDERWALL", link: "https://youtu.be/yd_V-1ySwBc?si=l8ASGgcZnEwmryS1", instrumental: 8, vocal: 7, bass: 8 },
  { title: "Elemer & Alis - Broken Angel", link: "https://youtu.be/GLOLgHkhWrg?si=qLExXMqaD-PsF7Br", instrumental: 7, vocal: 7, bass: 8 },
  { title: "MOUNT & Noize Generation - Around The World", link: "https://youtu.be/lFezkr9Qijw?si=DxZzzVZykGZP3pXO", instrumental: 8, vocal: 7.5, bass: 9 },
  { title: "Ugg'A - Think About", link: "https://youtu.be/Py5WNFpT5F4?si=A2SsUF1z_pH8-PkG", instrumental: 8, vocal: 8, bass: 9 }
];

const list = document.getElementById("songList");

function createSongCard(song) {
  const card = document.createElement("div");
  card.className = "glass";
  card.innerHTML = `
    <div class="song-row">
      <div class="song-meta">
        <a class="song-title" href="${song.link}" target="_blank">${escapeHtml(song.title)}</a>
        <div class="score-row">
          ${makeScore("Instrumental", song.instrumental, "progress-bar-custom")}
          ${makeScore("Vocal", song.vocal, "progress-bar-alt")}
          ${makeScore("Bass", song.bass, "progress-bar-warn")}
        </div>
      </div>
      <div class="song-actions">
        <a class="badge-link" href="${song.link}" target="_blank" title="Buka di YouTube">
          <i class="bi bi-youtube"></i>&nbsp;Play
        </a>
        <button class="badge-link btn-copy" data-link="${song.link}" title="Salin link">
          <i class="bi bi-clipboard"></i>&nbsp;Copy
        </button>
      </div>
    </div>
  `;

  const btn = card.querySelector(".btn-copy");
  btn.addEventListener("click", () => {
    const link = btn.dataset.link;
    navigator.clipboard?.writeText(link).then(() => {
      btn.innerHTML = "✓ Disalin";
      setTimeout(() => btn.innerHTML = '<i class="bi bi-clipboard"></i>&nbsp;Copy', 1200);
    }).catch(() => {
      btn.innerHTML = "Gagal";
      setTimeout(() => btn.innerHTML = '<i class="bi bi-clipboard"></i>&nbsp;Copy', 1200);
    });
  });

  return card;
}

function makeScore(label, value, cls) {
  return `
    <div class="score-item">
      <div class="score-label">${label}</div>
      <div class="progress">
        <div class="${cls}" style="width:${clamp(value, 0, 10) * 10}%"></div>
      </div>
      <div class="score-value">${value.toFixed(1)}</div>
    </div>
  `;
}

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function escapeHtml(text) { return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;"); }

songs.forEach(song => list.appendChild(createSongCard(song)));

// Theme toggle
const toggle = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

function setTheme(t) {
  document.documentElement.setAttribute("data-theme", t);
  icon.className = t === "light" ? "bi bi-moon" : "bi bi-brightness-high";
}

setTheme(document.documentElement.getAttribute("data-theme") || "light");

toggle.addEventListener("click", () => {
  const cur = document.documentElement.getAttribute("data-theme");
  setTheme(cur === "light" ? "dark" : "light");
});
