const commands = [
    { name: "24_7", description: "Enables/disables 24/7 mode or edits its settings", usage: "/24_7 [edit|voice_channel|text_channel|volume]" },
    { name: "autoplay", description: "Toggle autoplay", usage: "/autoplay" },
    { name: "changelog", description: "stuff that my owner coded on me.", usage: "/changelog" },
    { name: "clear", description: "Clear the music queue", usage: "/clear" },
    { name: "destroy", description: "destroy the music", usage: "/destroy" },
    { name: "export", description: "Export the queue", usage: "/export" },
    { name: "filters", description: "use filters on the music", usage: "/filters <filter>" },
    { name: "grab", description: "Grab a song from the queue, and send to DM", usage: "/grab" },
    { name: "import", description: "Import a queue from a file (txt, pdf)", usage: "/import <file>" },
    { name: "invite", description: "Invite Kenium cuz yes", usage: "/invite" },
    { name: "jump", description: "Jump to a specific position or song in the queue", usage: "/jump [position|name]" },
    { name: "loop", description: "Want some loop bro?", usage: "/loop <mode>" },
    { name: "lyrics", description: "Get lyrics for the current track or search for specific lyrics", usage: "/lyrics [search]" },
    { name: "nowplaying", description: "Display the currently playing song", usage: "/nowplaying" },
    { name: "pause", description: "Pause the current playing song", usage: "/pause" },
    { name: "ping", description: "Pong!", usage: "/ping" },
    { name: "play-file", description: "Play a song from a file.", usage: "/play-file <file>" },
    { name: "play", description: "Play a song by search query or URL.", usage: "/play <query>" },
    { name: "playlist create", description: "Create a new playlist", usage: "/playlist create <name>" },
    { name: "playlist add", description: "Add a track to a playlist", usage: "/playlist add <playlist> <track>" },
    { name: "playlist remove", description: "Remove a track from a playlist", usage: "/playlist remove <playlist> <index>" },
    { name: "playlist list", description: "List all playlists or tracks in a specific playlist", usage: "/playlist list [playlist] [page]" },
    { name: "playlist play", description: "Play a playlist", usage: "/playlist play <name>" },
    { name: "playlist delete", description: "Delete a playlist", usage: "/playlist delete <name>" },
    { name: "playlist export", description: "Export a playlist as a JSON file", usage: "/playlist export <name>" },
    { name: "playlist import", description: "Import a playlist from a JSON file", usage: "/playlist import <file> [name]" },
    { name: "previous", description: "Play the previous song", usage: "/previous" },
    { name: "queue", description: "Show the music queue", usage: "/queue" },
    { name: "remove", description: "Remove a track from the queue", usage: "/remove <track_number>" },
    { name: "restart", description: "Restart the music", usage: "/restart" },
    { name: "resume", description: "resume the music", usage: "/resume" },
    { name: "search", description: "Search for a song", usage: "/search <query>" },
    { name: "seek", description: "Seek to a specific position in the song", usage: "/seek <position>" },
    { name: "shuffle", description: "Shuffle the music queue", usage: "/shuffle" },
    { name: "skip", description: "Skip the current playing song", usage: "/skip" },
    { name: "status", description: "View system metrics and node status", usage: "/status" },
    { name: "stop", description: "stop the music", usage: "/stop" },
    { name: "volume", description: "Want some volume bro?", usage: "/volume <volume>" }
];

// Use DocumentFragment for batch DOM insertion
const commandsGrid = document.getElementById("commands-grid");
const fragment = document.createDocumentFragment();
const commandCardElements = [];

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
    fragment.appendChild(commandCard);
    commandCardElements.push({ element: commandCard, command });
});
commandsGrid.appendChild(fragment);

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


let searchTimeout;
commandSearchInput.addEventListener("input", () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        const searchTerm = commandSearchInput.value.toLowerCase();
        commandCardElements.forEach(({ element, command }) => {
            const name = command.name.toLowerCase();
            const description = command.description.toLowerCase();
            element.style.display = (name.includes(searchTerm) || description.includes(searchTerm)) ? "block" : "none";
        });
    }, 100);
});

document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles');
    const numberOfStars = 120;
    const stars = [];
    const starPositions = [];
    const starVelocities = [];

    // Use a DocumentFragment for better performance
    const fragment = document.createDocumentFragment();

    // Generate stars with more even distribution and glow
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 2 + 1.5; // 1.5px to 3.5px
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Even distribution using sqrt for radius and random angle
        const angle = Math.random() * 2 * Math.PI;
        const radius = Math.sqrt(Math.random()) * 48; // up to 48vw/vh
        const cx = 50 + Math.cos(angle) * radius;
        const cy = 50 + Math.sin(angle) * radius;

        star.style.left = `${cx}vw`;
        star.style.top = `${cy}vh`;

        // Subtle twinkle animation, more black/blueish glow
        star.style.animation = `twinkle ${Math.random() * 2 + 2}s infinite alternate`;
        star.style.boxShadow = `
            0 0 ${size * 4}px ${size * 1.5}px #0a0a1a, 
            0 0 8px 2px #222a, 
            0 0 2px 1px #fff8
        `;
        star.style.background = 'radial-gradient(circle, #fff 60%, #222 100%)';

        fragment.appendChild(star);
        stars.push(star);
        starPositions.push({ x: cx, y: cy });

        // Give each star a small random velocity
        const speed = Math.random() * 0.03 + 0.01; // vw/vh per frame
        const dir = Math.random() * 2 * Math.PI;
        starVelocities.push({
            vx: Math.cos(dir) * speed,
            vy: Math.sin(dir) * speed
        });
    }
    particlesContainer.appendChild(fragment);

    // Draw lines between close stars (max 3 connections per star)
    // We'll use a persistent container for lines to avoid memory leaks
    let lines = [];
    const maxConnections = 3;

    // Create a dedicated container for lines
    let linesContainer = document.createElement('div');
    linesContainer.style.position = 'absolute';
    linesContainer.style.left = '0';
    linesContainer.style.top = '0';
    linesContainer.style.width = '100vw';
    linesContainer.style.height = '100vh';
    linesContainer.style.pointerEvents = 'none';
    particlesContainer.appendChild(linesContainer);

    function updateLines() {
        // Remove all old lines efficiently
        while (linesContainer.firstChild) {
            linesContainer.removeChild(linesContainer.firstChild);
        }
        lines = [];
        const connectionMap = Array(numberOfStars).fill(0);

        for (let i = 0; i < numberOfStars; i++) {
            let connections = 0;
            for (let j = i + 1; j < numberOfStars; j++) {
                if (connectionMap[i] >= maxConnections || connectionMap[j] >= maxConnections) continue;
                const dx = starPositions[i].x - starPositions[j].x;
                const dy = starPositions[i].y - starPositions[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 12) { // connect if within 12vw/vh
                    const line = document.createElement('div');
                    line.classList.add('line');
                    line.style.position = 'absolute';
                    line.style.left = `${starPositions[i].x}vw`;
                    line.style.top = `${starPositions[i].y}vh`;
                    line.style.width = `${dist}vw`;
                    line.style.height = '1.5px';
                    line.style.background = 'linear-gradient(90deg, #222 0%, #fff2 60%, #0a0a1a 100%)';
                    line.style.transformOrigin = '0 0';
                    line.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
                    line.style.opacity = '0.5';
                    line.style.pointerEvents = 'none';
                    linesContainer.appendChild(line);
                    lines.push(line);
                    connectionMap[i]++;
                    connectionMap[j]++;
                    connections++;
                    if (connections >= maxConnections) break;
                }
            }
        }
    }

    function animate() {
        // Move stars
        for (let i = 0; i < numberOfStars; i++) {
            let pos = starPositions[i];
            let vel = starVelocities[i];
            pos.x += vel.vx;
            pos.y += vel.vy;

            // Bounce off edges (0vw/100vw, 0vh/100vh)
            if (pos.x < 0 || pos.x > 100) vel.vx *= -1;
            if (pos.y < 0 || pos.y > 100) vel.vy *= -1;

            // Clamp positions to stay within bounds
            pos.x = Math.max(0, Math.min(100, pos.x));
            pos.y = Math.max(0, Math.min(100, pos.y));

            stars[i].style.left = `${pos.x}vw`;
            stars[i].style.top = `${pos.y}vh`;
        }
        updateLines();
        requestAnimationFrame(animate);
    }

    // Set a dark background for the container
    particlesContainer.style.background = 'linear-gradient(180deg, #050510 0%, #111 100%)';

    updateLines();
    animate();
});
