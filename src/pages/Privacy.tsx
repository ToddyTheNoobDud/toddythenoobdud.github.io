import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Database, Trash2, Users } from "lucide-react";
import { Link } from "react-router-dom";
import Starfield from "@/components/Starfield";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Kenium Discord Music Bot</title>
        <meta name="description" content="Privacy policy for Kenium Discord Music Bot. Learn about data collection, usage, and how to manage your data." />
        <meta name="keywords" content="kenium, discord bot, privacy policy, data protection, music bot" />
        <link rel="canonical" href="https://kenium.lovableproject.com/privacy" />
      </Helmet>
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        <Starfield className="opacity-40" />
        
        <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="mb-6 text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            
            <div className="text-center mb-12">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-brand/20 border border-brand/30">
                  <Shield className="h-12 w-12 text-brand" />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-brand to-brand-2 bg-clip-text text-transparent">
                Privacy Policy for Kenium
              </h1>
              <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
                This privacy policy outlines the data we collect and store for the Discord Music Bot, as well as how you can manage or delete that data.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Database className="h-6 w-6 text-brand mr-3" />
                  <h2 className="text-2xl font-semibold text-white">Data We Store</h2>
                </div>
                <p className="text-neutral-300 mb-6">
                  We store the following information to enable certain features of the bot:
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                    <h3 className="font-semibold text-brand mb-2">For the 24/7 Command:</h3>
                    <p className="text-neutral-300">
                      <strong>GuildId, textChannel, and voiceChannel.</strong> This allows the bot to maintain persistent connections in servers where the 24/7 feature is enabled.
                    </p>
                  </div>
                  <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                    <h3 className="font-semibold text-brand mb-2">For Playlists:</h3>
                    <p className="text-neutral-300">
                      <strong>userId and tracks.</strong> This stores user-specific playlist data to allow saving and loading custom playlists.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Users className="h-6 w-6 text-brand mr-3" />
                  <h2 className="text-2xl font-semibold text-white">How We Use Your Data</h2>
                </div>
                <p className="text-neutral-300">
                  The data is used solely to provide the bot's functionality, such as keeping music playing 24/7 in a voice channel or managing user playlists. We do not share this data with third parties, and it is stored securely.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 border-neutral-800 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Trash2 className="h-6 w-6 text-brand mr-3" />
                  <h2 className="text-2xl font-semibold text-white">How to Delete Your Data</h2>
                </div>
                <p className="text-neutral-300 mb-6">
                  You have full control over your data. It can be deleted in the following ways:
                </p>
                <div className="space-y-4">
                  <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                    <p className="text-neutral-300">
                      • Disable the 24/7 feature in your server, which will automatically delete the associated GuildId, textChannel, and voiceChannel data.
                    </p>
                  </div>
                  <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                    <p className="text-neutral-300">
                      • Use the playlist delete command in Discord to remove your playlists, which will delete the userId and tracks data for those playlists.
                    </p>
                  </div>
                  <div className="p-4 bg-neutral-800/50 rounded-lg border border-neutral-700">
                    <p className="text-neutral-300">
                      • If you need further assistance or want to request deletion of any remaining data, contact me directly at <strong className="text-brand">"mushroom0162"</strong>.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-brand/10 to-brand-2/10 border-brand/30 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <p className="text-neutral-300">
                  This policy may be updated from time to time. For any questions, reach out via the contact method above.
                </p>
                <div className="mt-6">
                  <Link to="/">
                    <Button className="bg-brand hover:bg-brand/80 text-black font-semibold">
                      Return to Kenium
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;