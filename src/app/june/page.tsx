"use client"
import ProfilePage from "@/components/ProfilePage";
import { juneData } from "@/data/june";
export default function Page() {
  return (
    <ProfilePage profile={juneData} />
  );
}
