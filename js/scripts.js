document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Particle Canvas Animation (Falling Stars) ---
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const numberOfStars = 150;
        const stars = [];

        for (let i = 0; i < numberOfStars; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: Math.random() * 0.8 + 0.2,
                size: Math.random() * 2 + 1,
                color: '#FFFFFF'
            });
        }

        function animateParticles() {
            const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bgGradient.addColorStop(0, '#050510');
            bgGradient.addColorStop(1, '#111');
            ctx.fillStyle = bgGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                star.x += star.vx;
                star.y += star.vy;

                if (star.y > canvas.height + star.size) {
                    star.y = 0 - star.size;
                    star.x = Math.random() * canvas.width;
                }
                if (star.x < 0 - star.size) {
                    star.x = canvas.width + star.size;
                } else if (star.x > canvas.width + star.size) {
                    star.x = 0 - star.size;
                }

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = star.color;
                ctx.shadowColor = '#FFFFFF';
                ctx.shadowBlur = 8;
                ctx.fill();
            });
            
            ctx.shadowBlur = 0;
            
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 1;
            for (let i = 0; i < stars.length; i++) {
                for (let j = i + 1; j < stars.length; j++) {
                    const dx = stars[i].x - stars[j].x;
                    const dy = stars[i].y - stars[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 120) {
                        ctx.globalAlpha = 1 - (dist / 120);
                        ctx.beginPath();
                        ctx.moveTo(stars[i].x, stars[i].y);
                        ctx.lineTo(stars[j].x, stars[j].y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;

            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // --- 2. Commands List, Grid, Search, and Filtering ---
    // Added a 'category' property to each command for filtering.
    const commands = [
        { name: "24_7", description: "Enables/disables 24/7 mode.", usage: "/24_7 [edit|voice_channel|text_channel|volume]", category: "music" },
        { name: "autoplay", description: "Toggle autoplay.", usage: "/autoplay", category: "music" },
        { name: "changelog", description: "Shows the bot's changelog.", usage: "/changelog", category: "utility" },
        { name: "clear", description: "Clear the music queue.", usage: "/clear", category: "music" },
        { name: "destroy", description: "Destroys the music player.", usage: "/destroy", category: "music" },
        { name: "export", description: "Export the queue to a file.", usage: "/export", category: "playlist" },
        { name: "filters", description: "Apply audio filters to the music.", usage: "/filters <filter>", category: "music" },
        { name: "grab", description: "Grab a song and sends it to your DMs.", usage: "/grab", category: "music" },
        { name: "import", description: "Import a queue from a file.", usage: "/import <file>", category: "playlist" },
        { name: "invite", description: "Get the bot's invite link.", usage: "/invite", category: "utility" },
        { name: "jump", description: "Jump to a song in the queue.", usage: "/jump [position|name]", category: "music" },
        { name: "loop", description: "Change the loop mode.", usage: "/loop <mode>", category: "music" },
        { name: "lyrics", description: "Get lyrics for a song.", usage: "/lyrics [search]", category: "music" },
        { name: "nowplaying", description: "Display the currently playing song.", usage: "/nowplaying", category: "music" },
        { name: "pause", description: "Pause the current song.", usage: "/pause", category: "music" },
        { name: "ping", description: "Check the bot's latency.", usage: "/ping", category: "utility" },
        { name: "play-file", description: "Play a song from a local file.", usage: "/play-file <file>", category: "music" },
        { name: "play", description: "Play a song by name or URL.", usage: "/play <query>", category: "music" },
        { name: "playlist create", description: "Create a new playlist.", usage: "/playlist create <name>", category: "playlist" },
        { name: "playlist add", description: "Add a track to a playlist.", usage: "/playlist add <playlist> <track>", category: "playlist" },
        { name: "playlist remove", description: "Remove a track from a playlist.", usage: "/playlist remove <playlist> <index>", category: "playlist" },
        { name: "playlist list", description: "List all your playlists.", usage: "/playlist list [playlist]", category: "playlist" },
        { name: "playlist play", description: "Play a playlist.", usage: "/playlist play <name>", category: "playlist" },
        { name: "playlist delete", description: "Delete a playlist.", usage: "/playlist delete <name>", category: "playlist" },
        { name: "playlist export", description: "Export a playlist to a JSON file.", usage: "/playlist export <name>", category: "playlist" },
        { name: "playlist import", description: "Import a playlist from a JSON file.", usage: "/playlist import <file>", category: "playlist" },
        { name: "previous", description: "Play the previous song.", usage: "/previous", category: "music" },
        { name: "queue", description: "Show the music queue.", usage: "/queue", category: "music" },
        { name: "remove", description: "Remove a track from the queue.", usage: "/remove <track_number>", category: "music" },
        { name: "restart", description: "Restart the current song.", usage: "/restart", category: "music" },
        { name: "resume", description: "Resume the paused music.", usage: "/resume", category: "music" },
        { name: "search", description: "Search for a song.", usage: "/search <query>", category: "music" },
        { name: "seek", description: "Seek to a position in the song.", usage: "/seek <position>", category: "music" },
        { name: "shuffle", description: "Shuffle the music queue.", usage: "/shuffle", category: "music" },
        { name: "skip", description: "Skip the current song.", usage: "/skip", category: "music" },
        { name: "status", description: "View system metrics and status.", usage: "/status", category: "utility" },
        { name: "stop", description: "Stop the music and clear the queue.", usage: "/stop", category: "music" },
        { name: "volume", description: "Change the player volume.", usage: "/volume <volume>", category: "music" }
    ];

    const commandsGrid = document.getElementById("commands-grid");
    const commandSearchInput = document.getElementById("command-search");
    const filterBtns = document.querySelectorAll(".filter-btn");

    const commandCardElements = [];

    if (commandsGrid) {
        const fragment = document.createDocumentFragment();
        commands.forEach(command => {
            const commandCard = document.createElement("div");
            commandCard.className = "command-card";
            commandCard.dataset.category = command.category;
            commandCard.innerHTML = `
                <div class="command-icon"><i class="fas fa-terminal"></i></div>
                <h3 class="command-name">${command.name}</h3>
                <p class="command-description">${command.description}</p>
            `;
            commandCard.addEventListener("click", () => openModal(command));
            fragment.appendChild(commandCard);
            commandCardElements.push({ element: commandCard, command });
        });
        commandsGrid.appendChild(fragment);
    }
    
    function filterAndSearch() {
        const searchTerm = commandSearchInput.value.toLowerCase();
        const activeFilter = document.querySelector(".filter-btn.active").dataset.filter;
        
        commandCardElements.forEach(({ element, command }) => {
            const name = command.name.toLowerCase();
            const description = command.description.toLowerCase();
            const category = command.category;
            
            const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
            const matchesFilter = activeFilter === 'all' || category === activeFilter;
            
            element.style.display = matchesSearch && matchesFilter ? "block" : "none";
        });
    }

    if (commandSearchInput) {
        commandSearchInput.addEventListener("input", filterAndSearch);
    }

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            filterAndSearch();
        });
    });

    // --- 3. Command Modal ---
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
        modal.setAttribute('aria-hidden', 'false');
    }

    function closeModal() {
        modal.classList.remove("active");
        modal.setAttribute('aria-hidden', 'true');
    }

    if (modal) {
        modalClose.addEventListener("click", closeModal);
        modalCloseBtn.addEventListener("click", closeModal);
        modal.addEventListener("click", (e) => {
            if (e.target === modal) closeModal();
        });
    }

    // --- 4. Mobile Navigation ---
    const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const isExpanded = navMenu.classList.contains("active");
            mobileMenuToggle.setAttribute("aria-expanded", isExpanded);
        });
    }

    // --- 5. FAQ Accordion ---
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const header = item.querySelector("h3");
        header.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });

    // --- 6. Scroll-to-Top Button ---
    const scrollToTopBtn = document.getElementById("scroll-to-top");

    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add("visible");
            } else {
                scrollToTopBtn.classList.remove("visible");
            }
        });

        scrollToTopBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
