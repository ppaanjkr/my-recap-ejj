import { Profile } from "@/types/profile";
import { useState } from "react";
import ProfileHeader from "./profile/ProfileHeader";
import AboutSection from "./profile/AboutSection";
import MusicSection from "./music/MusicSection";
import { useSheetMusics } from "@/hooks/useSheetMusics";

interface Props {
    name: string,
    profile: Profile
}

const sectionIds = ["about", "works", "awards", "music", "interview", "gallery"];

export default function ProfilePage({name, profile}: Props) {
    // const [activeSection, setActiveSection] = useState("about");
    // const [selectedWork, setSelectedWork] = useState<Work | null>(null);
    const { music, loading, error } = useSheetMusics(name);

    return (
        <div className="min-h-screen bg-gray/95">
      <div className="max-w-2xl md:max-w-[100%] lg:max-w-[70%] mx-auto bg-white min-h-screen shadow-soft">
        <ProfileHeader data={profile} />
        {/* nav */}

        <main>
          <AboutSection data={profile} />
          {/* work */}
          {/* award */}
          <MusicSection music={music}/>
          {/* interview */}
          {/* gallary - not sure */}
        </main>
      </div>
    </div>

    );
}