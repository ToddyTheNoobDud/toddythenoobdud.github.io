
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Starfield from "@/components/Starfield";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Music,
  Zap,
  Settings2,
  Github,
  ShieldCheck,
  Shield,
  SlidersHorizontal,
  ListMusic,
  Mic2,
  Cpu,
  Plus,
  MessageCircle,
  Command,
  Volume2,
  Play,
  Pause,
  SkipForward,
  Shuffle,
  Repeat,
  Search,
  Download,
  Upload,
  BarChart3,
} from "lucide-react";

const AVATAR = "https://cdn.discordapp.com/avatars/1202232935311495209/b98da4d5daf014773f51485582521e18.png?size=4096&ignore=true";
const GITHUB = "https://github.com/ToddyTheNoobDud/Kenium-Music";
const SETUP_VIDEO = "https://www.youtube.com/watch?v=7aIjwQCEox8";
const INVITE_URL = "https://discord.com/oauth2/authorize?client_id=1202232935311495209";
const SUPPORT_SERVER = "https://discord.com/invite/K4CVv84VBC";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kenium — Free Discord Music Bot",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  description: "Kenium is a free, open-source Discord music bot. 24/7 uptime, Lavalink powered, zero paywalls or vote gates.",
  url: GITHUB,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  creator: { "@type": "Organization", name: "Kenium" },
};

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

const Index = () => {
  const canonical = typeof window !== "undefined" ? window.location.href : "/";

  const commands = [
    { name: "play", desc: "Play a song by search query or URL", icon: Play },
    { name: "pause", desc: "Pause the music", icon: Pause },
    { name: "skip", desc: "Skip the music", icon: SkipForward },
    { name: "queue", desc: "Show the music queue", icon: ListMusic },
    { name: "shuffle", desc: "Shuffle your queue", icon: Shuffle },
    { name: "loop", desc: "Want some loop bro?", icon: Repeat },
    { name: "volume", desc: "Change the volume of the music player", icon: Volume2 },
    { name: "lyrics", desc: "Get lyrics for the current song or search", icon: Mic2 },
    { name: "search", desc: "Search for a song on music platforms", icon: Search },
    { name: "filters", desc: "Apply some filters", icon: SlidersHorizontal },
    { name: "export", desc: "Export the queue", icon: Download },
    { name: "import", desc: "Import a queue from a file", icon: Upload },
    { name: "247", desc: "Toggle 247 mode", icon: ShieldCheck },
    { name: "autoplay", desc: "Toggle autoplay", icon: Music },
    { name: "nowplaying", desc: "Displays the currently playing song", icon: BarChart3 },
    { name: "playlists", desc: "Manage your personal playlists", icon: ListMusic },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      <Helmet>
        <title>Kenium — Free Discord Music Bot (Open Source)</title>
        <meta
          name="description"
          content="Kenium is a blazing-fast, free, open-source Discord music bot. 24/7 uptime, Lavalink powered, no votes or paywalls."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Kenium — Free Discord Music Bot" />
        <meta
          property="og:description"
          content="Free, fast and open-source. Play from YouTube, Spotify, SoundCloud and more with zero paywalls."
        />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Starfield background */}
      <Starfield />

      {/* HERO */}
      <header className="relative">
        <div className="container pb-10 pt-20 md:pt-24">
          <div className="mx-auto max-w-5xl text-center animate-enter">
            <div className="mb-6 flex items-center justify-center gap-3">
              <Badge className="bg-secondary text-secondary-foreground">
                Open Source · Free Forever
              </Badge>
              <Badge variant="outline">2025 Ready</Badge>
            </div>

            <img
              src={AVATAR}
              alt="Kenium Discord music bot avatar"
              className="mx-auto mb-6 h-24 w-24 rounded-2xl shadow-glow hover-scale"
              loading="eager"
              width={96}
              height={96}
            />

            <h1 className="mx-auto max-w-3xl text-balance text-5xl font-extrabold leading-tight tracking-tight md:text-6xl">
              Kenium — Your 2025 Music Bot BFF
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Simple, fast, 24/7. No votes. No paywalls. Just pure music vibes —
              powered by Lavalink and Aqualink. Join thousands of servers already vibing with Kenium.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="hero" size="xl" className="shadow-glow">
                <a href={INVITE_URL} aria-label="Invite Kenium to your Discord server" target="_blank" rel="noreferrer">
                  <Plus className="mr-1" /> Invite to Discord
                </a>
              </Button>
              <Button asChild variant="outline" size="xl" className="backdrop-blur">
                <a href={SUPPORT_SERVER} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-1" /> Support Server
                </a>
              </Button>
              <Button asChild variant="ghost" size="xl" className="backdrop-blur">
                <a href={GITHUB} aria-label="View Kenium on GitHub" target="_blank" rel="noreferrer">
                  <Github className="mr-1" /> GitHub
                </a>
              </Button>
              <Button asChild variant="ghost" size="xl" className="backdrop-blur">
                <Link to="/privacy">
                  <Shield className="mr-1" /> Privacy Policy
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* WHY SECTION */}
      <section className="relative">
        <div className="container py-10 md:py-14">
          <SectionHeading
            title="Why Kenium Slays in 2025?"
            subtitle="While other bots went pay-to-play or got shut down, Kenium stays free, reliable, and community-driven."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card className="animate-enter bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="text-brand" /> Free Vibes Only
                </CardTitle>
                <CardDescription>
                  Play from YouTube, Spotify, SoundCloud, Vimeo or local files —
                  zero cost and no vote gates. Unlike MEE6, Hydra, or other bots that went premium, Kenium stays completely free.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-enter bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="text-brand-2" /> Always Ready
                </CardTitle>
                <CardDescription>
                  24/7 jams on Galact Hosting. Stable and reliable for gaming or chilling. 
                  No more "bot offline" disappointments during your epic gaming sessions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-enter bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="text-brand" /> Easy as /play
                </CardTitle>
                <CardDescription>
                  One command to start. Smart autocomplete to find tracks fast.
                  No complicated setup, no premium features locked behind paywalls.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative">
        <div className="container py-10 md:py-14">
          <SectionHeading
            title="Features that Actually Matter"
            subtitle="Everything you need for the perfect Discord music experience — all included, all free."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="animate-enter bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="text-brand" /> Lightning Fast Playback
                </CardTitle>
                <CardDescription>
                  Smooth audio with ultra-low memory use (~0.5–1 MB RAM per player).
                  No lag, no buffering issues.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Works with YouTube, Spotify, SoundCloud, Vimeo and local files.
                Support for playlists and URLs from all major platforms.
              </CardContent>
            </Card>

            <Card className="animate-enter bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListMusic className="text-brand-2" /> Advanced Queue Management
                </CardTitle>
                <CardDescription>
                  Use /clear, /remove, /jump, or /shuffle to own your playlist.
                  Queue up to 1000 songs and never run out of music.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Autocomplete-powered search makes finding tracks effortless.
                Jump to specific songs or positions in your queue.
              </CardContent>
            </Card>

            <Card className="animate-enter bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="text-brand" /> Personal Playlists
                </CardTitle>
                <CardDescription>
                  Create, manage, and share personal playlists. Export as .txt, .pdf, or .json.
                  Import playlists from other bots or music services.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-enter bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic2 className="text-brand-2" /> Lyrics On Demand
                </CardTitle>
                <CardDescription>
                  Pull lyrics from Genius or LyricFind — even for deep cuts and rare tracks.
                  Never wonder about those lyrics again.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-enter bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal className="text-brand" /> Audio Filters & Effects
                </CardTitle>
                <CardDescription>
                  Bass boost, 8D audio, karaoke mode, nightcore, vaporwave, and more.
                  15+ audio filters to customize your listening experience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-enter bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu className="text-brand-2" /> Powered by Aqualink
                </CardTitle>
                <CardDescription>
                  Super light Lavalink client (~0.5–1 MB RAM) that's fast and stable.
                  Built for performance and reliability.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* COMMANDS SECTION */}
      <section className="relative">
        <div className="container py-10 md:py-14">
          <SectionHeading
            title="Essential Commands"
            subtitle="Master Kenium with these core commands — everything you need to control your music."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {commands.map((cmd, index) => {
              const IconComponent = cmd.icon;
              return (
                <Card key={cmd.name} className="animate-enter bg-card/30 backdrop-blur hover:bg-card/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <IconComponent className="h-5 w-5 text-brand mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-sm">/{cmd.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{cmd.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              And many more! Type <code className="bg-muted px-2 py-1 rounded text-sm">/</code> in Discord to see all available commands.
            </p>
          </div>
        </div>
      </section>

      {/* SETUP SECTION */}
      <section className="relative">
        <div className="container py-10 md:py-14">
          <SectionHeading
            title="Get Started in Minutes"
            subtitle="Add Kenium to your server or deploy your own instance — it's your choice."
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card className="animate-enter bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Quick Invite</CardTitle>
                <CardDescription>Add Kenium to your server instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    The fastest way to get started. Kenium is already hosted and ready to serve your music needs 24/7.
                  </p>
                  <div className="flex gap-2">
                    <Button asChild variant="hero" className="shadow-glow flex-1">
                      <a href={INVITE_URL} target="_blank" rel="noreferrer">
                        <Plus className="mr-1" /> Invite Kenium
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href={SUPPORT_SERVER} target="_blank" rel="noreferrer">
                        <MessageCircle className="mr-1" /> Support
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-enter bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle>Self-Host Setup</CardTitle>
                <CardDescription>Deploy your own instance for maximum control</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
                  <li>
                    Grab Lavalink: <a className="story-link" href="https://github.com/lavalink-devs/Lavalink" target="_blank" rel="noreferrer">setup guide</a>
                  </li>
                  <li>Clone the repo: <code className="rounded bg-muted px-1 py-0.5">git clone {GITHUB}</code></li>
                  <li>Install deps: <code className="rounded bg-muted px-1 py-0.5">pnpm install</code></li>
                  <li>Copy <code>.env.example</code> to <code>.env</code> and fill details</li>
                  <li>Start: <code className="rounded bg-muted px-1 py-0.5">pnpm start</code></li>
                </ol>
                <div className="mt-4">
                  <Button asChild variant="outline">
                    <a href={SETUP_VIDEO} target="_blank" rel="noreferrer">
                      <Zap className="mr-1" /> Watch setup video
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* COMMUNITY SECTION */}
      <section className="relative">
        <div className="container py-10 md:py-14">
          <SectionHeading
            title="Join the Community"
            subtitle="Thousands of servers already trust Kenium for their music needs."
          />

          <div className="mt-8 text-center space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand mb-2">24/7</div>
                <div className="text-muted-foreground">Uptime guarantee</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-2 mb-2">0$</div>
                <div className="text-muted-foreground">Forever free</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand mb-2">50+</div>
                <div className="text-muted-foreground">Commands available</div>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-muted-foreground mb-6">
                In 2025, many music bots went pay-to-play or got shut down. Kenium stays free, reliable, and open-source — 
                with smooth uptime and no YouTube restrictions slowing you down. Built by the community, for the community.
              </p>
              <Button asChild variant="hero" className="shadow-glow">
                <a href={GITHUB} target="_blank" rel="noreferrer">
                  <Github className="mr-1" /> Contribute on GitHub
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STARS SECTION */}
      <section className="relative">
        <div className="container py-10 md:py-14">
          <SectionHeading title="Growth & Stars" subtitle="Kenium's journey over time" />
          <div className="mt-6 overflow-hidden rounded-lg border bg-card/50 backdrop-blur p-2 animate-enter">
            <a
              href="https://www.star-history.com/#ToddyTheNoobDud/Kenium-Music&Date"
              target="_blank"
              rel="noreferrer"
              aria-label="Star history chart for Kenium"
            >
              <picture>
                <source
                  media="(prefers-color-scheme: dark)"
                  srcSet="https://api.star-history.com/svg?repos=ToddyTheNoobDud/Kenium-Music&type=Date&theme=dark"
                />
                <source
                  media="(prefers-color-scheme: light)"
                  srcSet="https://api.star-history.com/svg?repos=ToddyTheNoobDud/Kenium-Music&type=Date"
                />
                <img
                  alt="Star History Chart for Kenium"
                  src="https://api.star-history.com/svg?repos=ToddyTheNoobDud/Kenium-Music&type=Date&theme=dark"
                  loading="lazy"
                />
              </picture>
            </a>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-border/50">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <div className="flex items-center gap-3">
            <img
              src={AVATAR}
              alt="Kenium logo"
              className="h-8 w-8 rounded-lg"
              width={32}
              height={32}
              loading="lazy"
            />
            <span className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Kenium. MIT Licensed. Made with ❤️ for the Discord community.
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a className="story-link" href={INVITE_URL} target="_blank" rel="noreferrer">
              Invite Bot
            </a>
            <a className="story-link" href={SUPPORT_SERVER} target="_blank" rel="noreferrer">
              Support
            </a>
            <a className="story-link" href={GITHUB} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="story-link" href={SETUP_VIDEO} target="_blank" rel="noreferrer">
              Setup Guide
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
};

export default Index;
