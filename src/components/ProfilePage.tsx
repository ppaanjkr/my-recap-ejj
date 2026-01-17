"use client";

import { useState } from "react";
import ProfileHeader from "./profile/ProfileHeader";
import DesktopNav from "./nav/DesktopNav";
import MobileNav from "./nav/MobileNav";
import AboutSection from "./profile/AboutSection";
import WorksSection from "./work/WorksSection";
import MusicSection from "./music/MusicSection";
import { useSheetMusics } from "@/hooks/useSheetMusics";
import { useSheetWorks } from "@/hooks/useSheetWorks";
import { useSheetVideo } from "@/hooks/useSheetVideo";
import type { SectionId } from "@/types/section";
import type { Profile } from "@/types/profile";
import { MusicSkeleton, WorksSkeleton } from "./common/Skeleton";
import VideoSection from "./video/VideoSection";

interface Props {
  name: string;
  profile: Profile;
}

export default function ProfilePage({ name, profile }: Props) {
  const [activeSection, setActiveSection] = useState<SectionId>("about");

  const { music, musicLoading } = useSheetMusics(name);
  const { work, workLoading } = useSheetWorks(name);
  const { video, videoLoading } = useSheetVideo(name);

  return (
    <div className="min-h-screen bg-gray/95">
      <div className="mx-auto max-w-2xl md:max-w-full lg:max-w-[70%] bg-white min-h-screen shadow-soft pb-16 md:pb-0">
        <ProfileHeader data={profile} />

        <DesktopNav
          activeSection={activeSection}
          onChange={setActiveSection}
        />

        <main>
          {activeSection === "about" && (
            <AboutSection data={profile} />
          )}

          {activeSection === "works" && (
            workLoading ? <WorksSkeleton /> : <WorksSection works={work} />
          )}

          {activeSection === "music" && (
            musicLoading ? <MusicSkeleton /> : <MusicSection music={music} />
          )}

          {activeSection === "videos" && (
            videoLoading ? <MusicSkeleton /> : <VideoSection videos={video} />
          )}
        </main>

        <MobileNav
          activeSection={activeSection}
          onChange={setActiveSection}
        />
      </div>
    </div>
  );
}
function useSheetVideos(name: string): { video: any; workLoading: any; } {
  throw new Error("Function not implemented.");
}

