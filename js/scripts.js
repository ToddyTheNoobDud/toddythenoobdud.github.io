
const commands = [
    { name: "destroy", description: "Destroy the music playback.", usage: "/destroy" },
    { name: "export", description: "Export the current queue to a file.", usage: "/export" },
    { name: "grab", description: "Grab a song and send it to your DMs.", usage: "/grab" },
    { name: "import", description: "Import a song from a file (txt or pdf).", usage: "/import" },
    { name: "invite", description: "Invite Kenium Music Bot to your server.", usage: "/invite" },
    { name: "jump", description: "Jump to a specific part of the queue.", usage: "/jump <position>" },
    { name: "loop", description: "Enable or disable looping for the current song or queue.", usage: "/loop [song/queue]" },
    { name: "lyrics", description: "Get the lyrics for the current song.", usage: "/lyrics" },
    { name: "pause", description: "Pause the currently playing song.", usage: "/pause" },
    { name: "ping", description: "Check the bot's latency.", usage: "/ping" },
    { name: "play", description: "Play a song by search or URL.", usage: "/play <query/URL>" },
    { name: "play-file", description: "Play a song from a file.", usage: "/play-file" },
    { name: "queue", description: "Manage the queue: clear, show, or remove tracks.", usage: "/queue [clear/show/remove]" },
    { name: "restart", description: "Restart the current song.", usage: "/restart" },
    { name: "resume", description: "Resume the paused song.", usage: "/resume" },
    { name: "seek", description: "Seek to a specific part of the song.", usage: "/seek <time>" },
    { name: "skip", description: "Skip the current song.", usage: "/skip" },
    { name: "status", description: "Check the bot's status.", usage: "/status" },
    { name: "volume", description: "Set the volume of the music.", usage: "/volume <level>" }
];

// Populate Commands Grid
const commandsGrid = document.getElementById("commands-grid");
commands.forEach(command => {
    const commandCard = document.createElement("div");
    commandCard.className = "command-card";
    commandCard.innerHTML = `
        <div class="command-icon">
            <i class="fas fa-terminal"></i>
        </div>
        <h3 class="command-name">${command.name}</h3>
        <p class="command-description">${command.description}</p>
    `;
    commandCard.addEventListener("click", () => openModal(command));
    commandsGrid.appendChild(commandCard);
});



// Modal Handling
const modal = document.getElementById("command-modal");
const modalCommandName = document.getElementById("modal-command-name");
const modalCommandDescription = document.getElementById("modal-command-description");
const modalCommandUsage = document.getElementById("modal-command-usage");
const modalClose = document.getElementById("modal-close");
const modalCloseBtn = document.getElementById("modal-close-btn");

function openModal(command) {
    modalCommandName.textContent = command.name;
    modalCommandDescription.textContent = command.description;
    modalCommandUsage.textContent = `Usage: ${command.usage}`;
    modal.classList.add("active");
}

function closeModal() {
    modal.classList.remove("active");
}

modalClose.addEventListener("click", closeModal);
modalCloseBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

const commandSearchInput = document.getElementById("command-search");

commandSearchInput.addEventListener("input", () => {
    const searchTerm = commandSearchInput.value.toLowerCase();
    const commandCards = document.querySelectorAll(".command-card");

    commandCards.forEach(card => {
        const commandName = card.querySelector(".command-name").textContent.toLowerCase();
        const commandDescription = card.querySelector(".command-description").textContent.toLowerCase();

        if (commandName.includes(searchTerm) || commandDescription.includes(searchTerm)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});
