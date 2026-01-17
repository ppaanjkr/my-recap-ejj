"use client";

import { useMemo, useState } from "react";
import type { Profile } from "@/types/profile";
import { formatThaiDate } from "@/lib/formatThaiDate";
import { calculateAge } from "@/lib/calculateAge";
import AboutSectionItem from "./AboutSectionItem";
import AboutSectionContact from "./AboutSectionContact";

type Props = {
  data: Profile;
};

export default function AboutSection({ data }: Props) {
  const besties = data.Besties ?? [];

  return (
    <section id="about" className="px-4 md:px-12 pb-6 text-blackSoft">
      <h2 className="flex items-center gap-2 text-sm font-semibold mb-1">
        <span className="text-sm">📋</span> About
      </h2>

      <div className="rounded-lg border border-pinkLight bg-white shadow-md p-4">
        <div className="grid grid-cols-12 gap-y-2 gap-x-5">
          {/* birthday */}
          <AboutSectionItem
            title="วันเกิด"
            value={`${formatThaiDate(data.birthday)} (${calculateAge(
              data.birthday
            )} ปี)`}
          />
          {/* color */}
          {(data.LikesAndDislikes?.likeColor?.length ?? 0) > 0 && (
            <AboutSectionItem
              title="สีที่ชอบ"
              value={data.LikesAndDislikes?.likeColor?.join(", ") || "-"}
            />
          )}
          {/* food */}
          {(data.LikesAndDislikes?.likeFood?.length ?? 0) > 0 && (
            <AboutSectionItem
              title="อาหารที่ชอบ"
              value={data.LikesAndDislikes?.likeFood?.join(", ") || "-"}
            />
          )}
          {/* pet */}
          {(data.LikesAndDislikes?.likePet?.length ?? 0) > 0 && (
            <AboutSectionItem
              title="สัตว์ที่ชอบ"
              value={data.LikesAndDislikes?.likePet?.join(", ") || "-"}
            />
          )}
          {/* hobby */}
          {(data.LikesAndDislikes?.likeHobby?.length ?? 0) > 0 && (
            <AboutSectionItem
              title="งานอดิเรก"
              value={data.LikesAndDislikes?.likeHobby?.join(", ") || "-"}
            />
          )}
          {/* sport */}
          {(data.LikesAndDislikes?.likeSport?.length ?? 0) > 0 && (
            <AboutSectionItem
              title="กีฬาที่ชอบ"
              value={data.LikesAndDislikes?.likeSport?.join(", ") || "-"}
            />
          )}
          {/* collectible */}
          {(data.LikesAndDislikes?.likeCollectible?.length ?? 0) > 0 && (
            <AboutSectionItem
              title="ของสะสม"
              value={data.LikesAndDislikes?.likeCollectible?.join(", ") || "-"}
            />
          )}
          {/* artist */}
          {(data.LikesAndDislikes?.likeArtist?.length ?? 0) > 0 && (
            <AboutSectionItem
              title="ศิลปินที่ชอบ"
              value={data.LikesAndDislikes?.likeArtist?.join(", ") || "-"}
            />
          )}
          {/* music */}
          {(data.LikesAndDislikes?.likeMusic?.length ?? 0) > 0 && (
            <AboutSectionItem
              title="แนวเพลงโปรด"
              value={data.LikesAndDislikes?.likeMusic?.join(", ") || "-"}
            />
          )}
          {/* movie */}
          {(data.LikesAndDislikes?.likeMovie?.length ?? 0) > 0 && (
            <AboutSectionItem
              title="หนังเรื่องโปรด"
              value={data.LikesAndDislikes?.likeMovie?.join(", ") || "-"}
            />
          )}
          {/* place */}
          {(data.LikesAndDislikes?.likePlace?.length ?? 0) > 0 && (
            <AboutSectionItem
              title="สถานที่ที่ชอบ"
              value={data.LikesAndDislikes?.likePlace?.join(", ") || "-"}
            />
          )}
          {/* allergy */}
          {(data.Allergy?.length ?? 0) > 0 && (
            <div className="col-span-12 md:col-span-6">
              <div className="space-y-1">
                <div className="text-xs font-medium text-graySoft">
                  สิ่งที่แพ้ *
                </div>
                <div className="text-sm font-extrabold text-red-300 italic">
                  {data.Allergy?.join(", ") || "-"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* contact for work */}
        {data.ContactForWork && (
          <>
            <div className="my-5 h-px bg-pinkLight/50" />
            <div className="mt-3 grid grid-cols-12 gap-y-2 gap-x-5">
              <AboutSectionItem
                title="Entertainment"
                value={data.ContactForWork?.entertainment?.join(", ") || "-"}
              />
              <div className="col-span-12 md:col-span-6">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-graySoft">
                    Contact For Work
                  </div>
                  <div className="text-sm font-extrabold ">
                    <div>K. {data.ContactForWork?.name}</div>
                    {data.ContactForWork?.mobile && (
                      <AboutSectionContact
                        contact={data.ContactForWork?.mobile}
                        social="tel"
                      />
                    )}
                    {data.ContactForWork?.instagram && (
                      <AboutSectionContact
                        contact={data.ContactForWork?.instagram}
                        social="instagram"
                      />
                    )}
                    {data.ContactForWork?.line && (
                      <AboutSectionContact
                        contact={data.ContactForWork?.line}
                        social="line"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* family */}
      {(data.Besties?.length ?? 0) > 0 && (
        <div className="mt-4">
          {/* Title */}
          <h2 className="flex items-center gap-2 text-sm font-semibold mb-1">
            <span className="text-sm">🐶</span> Baby
          </h2>

          <div className="grid grid-cols-12 gap-3 gap-y-2 gap-x-5">
            {data.Besties?.map((b) => (
              <div
                key={b.index}
                className="col-span-12 md:col-span-12 lg:col-span-6 rounded-lg border border-pinkLight bg-white shadow-md p-3 flex justify-between items-center"
              >
                <div className="flex items-center gap-x-3">
                  <div className="h-11 w-11 rounded-full border border-pinkLight bg-pinkSoft/25 overflow-hidden flex items-center justify-center">
                    {b.Image ? (
                      <img
                        src={b.Image}
                        alt={b.name ?? "bestie"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-lg">🐶</span>
                    )}
                  </div>
                  <div className="">
                    <div className="text-sm font-extrabold text-blackSoft truncate">
                      {b.name || "—"}
                    </div>
                    <div className="text-sm text-graySoft truncate">
                      {b.relationship || "—"}
                    </div>
                  </div>
                </div>
                <div>
                  {b.instagram && (
                    <a href={`${b.instagram}`}>
                      <img
                        src={`/social/instagram.png`}
                        alt="instagram"
                        className="w-6 inline-block mr-1"
                      />
                    </a>
                  )}
                  {b.tiktok && (
                    <a href={`${b.tiktok}`}>
                      <img
                        src={`/social/tiktok.png`}
                        alt="tiktok"
                        className="w-6 inline-block mr-1"
                      />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* fanclub */}
      {(data.OfficialFanclub?.length ?? 0) > 0 && (
        <div className="mt-4">
          {/* Title */}
          <h2 className="flex items-center gap-2 text-sm font-semibold mb-1">
            <span className="text-sm">💗</span> Official Fanclub (TH)
          </h2>

          <div className="grid grid-cols-12 gap-3 gap-y-2 gap-x-5">
            {data.OfficialFanclub?.map((f) => (
              <div
                key={f.name}
                className="col-span-12 md:col-span-12 lg:col-span-6 rounded-lg border border-pinkLight bg-white shadow-md p-3 flex justify-between items-center"
              >
                <div className="flex items-center gap-x-3">
                  <div className="h-11 w-11 rounded-full border border-pinkLight bg-pinkSoft/25 overflow-hidden flex items-center justify-center">
                    {f.logo ? (
                      <img
                        src={f.logo}
                        alt={f.name ?? "fanclub"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-lg">🤍</span>
                    )}
                  </div>
                  <div className="text-blackSoft gap-y-0">
                    <div className="font-semibold text-sm">{f.name}</div>
                    <div>
                      {f.twitter && (
                        <a href={`${f.twitter}`}>
                          <img
                            src={`/social/twitter.png`}
                            alt="twitter"
                            className="w-4 inline-block mr-1"
                          />
                        </a>
                      )}
                      {f.instagram && (
                        <a href={`${f.instagram}`}>
                          <img
                            src={`/social/instagram.png`}
                            alt="instagram"
                            className="w-4 inline-block mr-1"
                          />
                        </a>
                      )}
                      {f.tiktok && (
                        <a href={`${f.tiktok}`}>
                          <img
                            src={`/social/tiktok.png`}
                            alt="tiktok"
                            className="w-5 inline-block mr-1"
                          />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
