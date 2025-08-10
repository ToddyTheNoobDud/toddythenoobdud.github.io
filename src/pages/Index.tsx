import { Helmet } from "react-helmet-async";
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
  SlidersHorizontal,
  ListMusic,
  Mic2,
  Cpu,
} from "lucide-react";

const AVATAR =
  "https://toddythenoobdud.github.io/0a0f3c0476c8b495838fa6a94c7e88c2.png";
const GITHUB = "https://github.com/ToddyTheNoobDud/Kenium-Music";
const SETUP_VIDEO = "https://www.youtube.com/watch?v=5etqxAG9tVg";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kenium — Free Discord Music Bot",
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Any",
  description:
    "Kenium is a free, open-source Discord music bot. 24/7 uptime, Lavalink powered, zero paywalls or vote gates.",
  url: GITHUB,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  creator: { "@type": "Organization", name: "Kenium" },
};

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
}

const Index = () => {
  const canonical = typeof window !== "undefined" ? window.location.href : "/";

  return (
    <main className="relative min-h-screen overflow-hidden">
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
              powered by Lavalink and Aqualink.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="hero" size="xl" className="shadow-glow">
                <a href={GITHUB} aria-label="View Kenium on GitHub" target="_blank" rel="noreferrer">
                  <Github className="mr-1" /> Star on GitHub
                </a>
              </Button>
              <Button asChild variant="outline" size="xl" className="backdrop-blur">
                <a href={SETUP_VIDEO} target="_blank" rel="noreferrer">
                  <Zap className="mr-1" /> Setup Video
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* WHY SECTION */}
      <section className="relative">
        <div className="container py-10 md:py-14">
          <SectionHeading
            title="Why Kenium?"
            subtitle="Free vibes only. Always online. Crystal-clear and open-source."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Card className="animate-enter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap /> Free Vibes Only
                </CardTitle>
                <CardDescription>
                  Play from YouTube, Spotify, SoundCloud, Vimeo or local files —
                  zero cost and no vote gates.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-enter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck /> Always Ready
                </CardTitle>
                <CardDescription>
                  24/7 jams on Galact Hosting. Stable and reliable for gaming or chilling.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-enter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 /> Easy as /play
                </CardTitle>
                <CardDescription>
                  One command to start. Smart autocomplete to find tracks fast.
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
            title="Features that Slay"
            subtitle="Packed with everything you need — all free."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="animate-enter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music /> Fast Jams
                </CardTitle>
                <CardDescription>
                  Smooth audio with ultra-low memory use (~0.5–1 MB RAM per player).
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Works with YouTube, Spotify, SoundCloud, Vimeo and local files.
              </CardContent>
            </Card>

            <Card className="animate-enter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ListMusic /> Queue Control
                </CardTitle>
                <CardDescription>
                  Use /clear, /remove or /shuffle to own your playlist.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Autocomplete-powered search makes it effortless.
              </CardContent>
            </Card>

            <Card className="animate-enter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal /> Playlist Power
                </CardTitle>
                <CardDescription>
                  Save or share playlists as .txt or .pdf with auto naming.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-enter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mic2 /> Lyrics On Tap
                </CardTitle>
                <CardDescription>
                  Pull lyrics from Genius or LyricFind — even for deep cuts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-enter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SlidersHorizontal /> Tune It Up
                </CardTitle>
                <CardDescription>
                  Bass boost, speed control and filters. No upsells.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="animate-enter">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Cpu /> Powered by Aqualink
                </CardTitle>
                <CardDescription>
                  Super light Lavalink client (~0.5–1 MB RAM) that’s fast and stable.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* SETUP SECTION */}
      <section className="relative">
        <div className="container py-10 md:py-14">
          <SectionHeading
            title="Set It Up in Minutes"
            subtitle="Deploy Kenium on your server with this quick guide."
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <Card className="animate-enter">
              <CardHeader>
                <CardTitle>Steps</CardTitle>
                <CardDescription>Quickstart for Node 20+ and Lavalink</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
                  <li>
                    Grab Lavalink: <a className="story-link" href="https://github.com/lavalink-devs/Lavalink" target="_blank" rel="noreferrer">setup guide</a>
                  </li>
                  <li>Clone the repo: <code className="rounded bg-muted px-1 py-0.5">git clone {GITHUB}</code></li>
                  <li>Install deps: <code className="rounded bg-muted px-1 py-0.5">pnpm install</code></li>
                  <li>Copy <code>.env.example</code> to <code>.env</code> and fill details</li>
                  <li>Start: <code className="rounded bg-muted px-1 py-0.5">pnpm start</code> or <code>npm start</code></li>
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

            <Card className="animate-enter">
              <CardHeader>
                <CardTitle>Why It Beats the Rest</CardTitle>
                <CardDescription>No votes. No paywalls. No shady stuff.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-3">
                <p>
                  In 2025, many music bots went pay-to-play or got shut down. Kenium stays free, reliable, and open-source — with smooth uptime on Galact Hosting and no YouTube restrictions slowing you down.
                </p>
                <p>
                  Read the code on GitHub, submit ideas or PRs, and shape the future of the bot together with the community.
                </p>
                <div className="pt-2">
                  <Button asChild variant="hero" className="shadow-glow">
                    <a href={GITHUB} target="_blank" rel="noreferrer">
                      <Github className="mr-1" /> Contribute on GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* STARS SECTION */}
      <section className="relative">
        <div className="container py-10 md:py-14">
          <SectionHeading title="Stars" subtitle="Kenium growth over time" />
          <div className="mt-6 overflow-hidden rounded-lg border bg-card p-2 animate-enter">
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
                  src="https://api.star-history.com/svg?repos=ToddyTheNoobDud/Kenium-Music&type=Date"
                  loading="lazy"
                />
              </picture>
            </a>
          </div>
        </div>
      </section>

      <footer className="relative border-t">
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
              © {new Date().getFullYear()} Kenium. MIT Licensed.
            </span>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a className="story-link" href={GITHUB} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a className="story-link" href={SETUP_VIDEO} target="_blank" rel="noreferrer">
              Setup Video
            </a>
          </nav>
        </div>
      </footer>
    </main>
  );
};

export default Index;
