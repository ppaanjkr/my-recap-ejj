"use client"
import ProfilePage from "@/components/ProfilePage";
import { enjoyData } from "@/data/enjoy";
export default function Page() {
  return (
    <ProfilePage profile={enjoyData} name="enjoy"/>
  );
}
