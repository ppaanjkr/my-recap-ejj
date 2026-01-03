"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useSheetEvents } from "@/hooks/useSheetEvents";
import { CalendarItem } from "@/types/calendar";
import SocialLinks from "./SocialLinks";
import { withBasePath } from "@/lib/basePath";

const ARTIST_ICON: Record<string, string> = {
  june: "/artist/june.png",
  enjoy: "/artist/enjoy.png",
};

type ArtistFilter = "all" | "june" | "enjoy";

function pad2(n: number) {
  return String(n).padStart(2, "0");
}
function ymd(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function monthLabelTH(d: Date) {
  return d.toLocaleDateString("th-TH", { month: "long", year: "numeric" });
}
function daysInMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
}
function monIndex(jsDay: number) {
  return (jsDay + 6) % 7;
}
function sameMonth(dateStr: string, cursor: Date) {
  const prefix = `${cursor.getFullYear()}-${pad2(cursor.getMonth() + 1)}-`;
  return dateStr.startsWith(prefix);
}
function matchArtist(it: CalendarItem, filter: ArtistFilter) {
  if (filter === "all") return true;
  return (it.artists ?? []).includes(filter as any);
}
function parseYMD(dateStr: string) {
  return new Date(`${dateStr}T00:00:00`);
}
function formatThaiFull(dateStr: string) {
  return parseYMD(dateStr).toLocaleDateString("th-TH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function CalendarPage() {
  const { items, loading, error } = useSheetEvents();

  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const [filter, setFilter] = useState<ArtistFilter>("all");
  const [selected, setSelected] = useState<CalendarItem | null>(null);

  const exportRef = useRef<HTMLDivElement>(null);

  // ✅ จุดแก้ไขสำคัญ: เพิ่ม [items] เพื่อให้รีเฟรชแล้วข้อมูลที่โหลดมาทีหลังถูกนำมาคำนวณ
  const byDateAll = useMemo(() => {
    const m = new Map<string, CalendarItem[]>();
    for (const it of items) {
      const normalized: CalendarItem = {
        ...it,
        artists: it.artists ?? [],
        meeting: it.meeting ?? false,
        images: it.images ?? [],
      };
      if (!m.has(normalized.date)) m.set(normalized.date, []);
      m.get(normalized.date)!.push(normalized);
    }
    for (const [k, arr] of Array.from(m)) {
      m.set(k, arr.slice(0, 5));
    }
    return m;
  }, [items]); 

  const byDate = useMemo(() => {
    if (filter === "all") return byDateAll;
    const m = new Map<string, CalendarItem[]>();
    for (const [date, arr] of Array.from(byDateAll.entries())) {
      const filtered = arr.filter((it) => matchArtist(it, filter));
      if (filtered.length > 0) m.set(date, filtered);
    }

    return m;
  }, [byDateAll, filter]);

  const grid = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const offset = monIndex(first.getDay());
    const total = daysInMonth(cursor);
    const cells: any[] = [];

    for (let i = 0; i < offset; i++) cells.push({ isPad: true });
    for (let day = 1; day <= total; day++) {
      const d = new Date(cursor.getFullYear(), cursor.getMonth(), day);
      const key = ymd(d);
      cells.push({ date: key, day, list: byDate.get(key) ?? [], isPad: false });
    }
    while (cells.length % 7 !== 0) cells.push({ isPad: true });
    return cells;
  }, [cursor, byDate]);

  const mobileDays = useMemo(() => {
    return Array.from(byDate.entries())
      .filter(([date]) => sameMonth(date, cursor))
      .sort(([a], [b]) => a.localeCompare(b));
  }, [byDate, cursor]);

  const prevMonth = () =>
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1));
  const nextMonth = () =>
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1));

  const coverOf = (it: CalendarItem) => it.images?.[0];
  const thumbsOf = (it: CalendarItem) => it.images?.slice(1, 5) ?? [];

  return (
    <div className="w-full h-screen mx-auto max-w-[1400px] px-3 md:px-6 py-6 flex flex-col text-blackSoft">
      <div className="rounded-xl bg-white/95 backdrop-blur border border-pinkLight shadow-soft py-4 px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-pinkSoft px-3 py-1 text-sm font-semibold text-blackSoft">
              🎀 EnjoyJune Scheduler Test
            </div>
            <h1 className="mt-3 text-xl font-extrabold tracking-tight text-blackSoft">
              แพลนงานเดือน {monthLabelTH(cursor)}
            </h1>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
              <div className="flex w-full overflow-hidden rounded-2xl border border-pinkLight bg-white sm:w-auto">
                <button
                  onClick={() => setFilter("all")}
                  className={[
                    "flex-1 px-3 py-2 text-sm font-semibold",
                    filter === "all"
                      ? "bg-pinkMain text-white"
                      : "hover:bg-pinkSoft text-blackSoft",
                  ].join(" ")}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("june")}
                  className={[
                    "flex-1 px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2",
                    filter === "june"
                      ? "bg-pinkMain text-white"
                      : "hover:bg-pinkSoft text-blackSoft",
                  ].join(" ")}
                >
                  <Image
                    src={withBasePath(ARTIST_ICON.june)}
                    alt="june"
                    width={16}
                    height={16}
                  />{" "}
                  June
                </button>
                <button
                  onClick={() => setFilter("enjoy")}
                  className={[
                    "flex-1 px-4 py-2 text-sm font-semibold flex items-center justify-center gap-2",
                    filter === "enjoy"
                      ? "bg-pinkMain text-white"
                      : "hover:bg-pinkSoft text-blackSoft",
                  ].join(" ")}
                >
                  <Image
                    src={withBasePath(ARTIST_ICON.enjoy)}
                    alt="enjoy"
                    width={16}
                    height={16}
                  />{" "}
                  Enjoy
                </button>
              </div>
            </div>
            {/* เลือกเดือน */}
            <div className="w-full sm:w-auto inline-flex items-center justify-between overflow-hidden rounded-2xl border border-pinkLight bg-white">
              <button
                onClick={prevMonth}
                className="px-4 py-2 font-semibold hover:bg-pinkSoft text-blackSoft"
              >
                ‹
              </button>
              <div className="px-4 py-2 text-sm font-semibold text-blackSoft md:w-[140px] text-center">
                {monthLabelTH(cursor)}
              </div>
              <button
                onClick={nextMonth}
                className="px-4 py-2 font-semibold hover:bg-pinkSoft  text-blackSoft"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="mt-2 md:hidden">
        {loading ? (
          <div className="p-10 text-center">กำลังโหลด...</div>
        ) : mobileDays.length === 0 ? (
          <div className="rounded-xl border border-pinkLight bg-white p-6 text-sm text-blackSoft/80 shadow-soft text-center">
            <Image
              src={"/nodata.png"}
              alt="nodata"
              width={200}
              height={200}
              className={"mx-auto"}
            />
            <label className="text-lg">
              ไม่มีงาน มีแต่ความน่ารักของดอลล่าห์
            </label>
          </div>
        ) : (
          <div className="space-y-2 mb-6">
            {mobileDays.map(([date, list]) => (
              <div
                key={date}
                className="rounded-xl border border-pinkLight bg-white p-4 shadow-soft"
              >
                <div className="flex items-center justify-between">
                  <div className="text-base font-extrabold text-blackSoft">
                    {formatThaiFull(date)}
                  </div>
                  <div className="text-sm text-blackSoft/70">
                    {list.length} งาน
                  </div>
                </div>
                <div className="mt-3 grid gap-3">
                  {list.map((it) => (
                    <button
                      key={it.id}
                      onClick={() => setSelected(it)}
                      className="overflow-hidden rounded-xl border border-pinkSoft bg-white text-left shadow-sm transition-all hover:-translate-y-1"
                    >
                      <div className="relative h-36 bg-pinkSoft">
                        {coverOf(it) && (
                          <img
                            src={coverOf(it)}
                            className="h-full w-full object-cover"
                          />
                        )}
                        <div className="absolute right-2 bottom-2 flex gap-1">
                          {it.artists
                            ?.filter((a) => ARTIST_ICON[a])
                            .map((a) => (
                              <img
                                key={a}
                                src={ARTIST_ICON[a]}
                                className="h-7 w-7 rounded-md border border-white bg-white/80"
                              />
                            ))}
                        </div>
                      </div>
                      <div
                        className={[
                          "p-4 leading-tight text-blackSoft",
                          it.meeting ? "font-extrabold" : "font-normal",
                        ].join(" ")}
                      >
                        {it.title}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PC View */}
      <div
        className="mt-2 hidden md:block flex-1 overflow-auto"
        ref={exportRef}
      >
        <div className="h-full rounded-lg border border-pinkLight bg-white flex flex-col overflow-hidden">
          <div className="grid grid-cols-7 bg-pinkSoft text-xs font-semibold text-blackSoft text-center">
            {[
              "จันทร์",
              "อังคาร",
              "พุธ",
              "พฤหัส",
              "ศุกร์",
              "เสาร์",
              "อาทิตย์",
            ].map((w) => (
              <div key={w} className="px-4 py-3">
                {w}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 flex-1 min-h-0 border border-pinkSoft [grid-template-rows:repeat(6,minmax(0,1fr))]">
            {grid.map((c, idx) => (
              <div
                key={idx}
                className={[
                  "h-full min-h-0 overflow-hidden flex flex-col border-b border-r border-pinkSoft",
                  c.isPad ? "bg-white/40" : "bg-white",
                  idx % 7 === 6 ? "border-r-0" : "",
                ].join(" ")}
              >
                {!c.isPad && (
                  <>
                    <div className="px-3 pt-3 flex items-start justify-between">
                      <div className="text-sm font-extrabold text-blackSoft">
                        {pad2(c.day!)}
                      </div>
                      {c.list.length > 0 && (
                        <span className="text-[12px] font-semibold text-blackSoft/80">
                          {c.list.length} งาน
                        </span>
                      )}
                    </div>
                    <div className="px-2 flex-1 min-h-0 overflow-auto no-scrollbar pt-0 pb-2 space-y-1">
                      {c.list.map((it: CalendarItem) => (
                        <button
                          key={it.id}
                          onClick={() => setSelected(it)}
                          // className="w-full overflow-hidden rounded-lg border border-pinkSoft bg-white text-left shadow-sm grid grid-cols-2 h-[65px]"
                          className="w-full overflow-hidden rounded-lg border border-pinkSoft bg-white text-left shadow-sm transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md grid grid-cols-2 h-[65px]"
                        >
                          <div className="relative w-full bg-pinkSoft">
                            {coverOf(it) && (
                              <img
                                src={coverOf(it)}
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                            )}
                            <div className="absolute right-0.5 bottom-0.5 flex gap-x-0.5">
                              {it.artists
                                ?.filter((a) => ARTIST_ICON[a])
                                .map((a) => (
                                  <img
                                    key={a}
                                    src={ARTIST_ICON[a]}
                                    className="h-4 w-4 rounded-md border border-white bg-white/80"
                                  />
                                ))}
                            </div>
                          </div>
                          <div
                            className={[
                              "p-1 min-w-0 text-sm leading-tight text-blackSoft line-clamp-3",
                              it.meeting ? "font-extrabold" : "font-normal",
                            ].join(" ")}
                          >
                            {it.title}
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Detail */}
      {selected && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 bg-pinkSoft">
              {coverOf(selected) && (
                <img
                  src={coverOf(selected)}
                  className="h-full w-full object-cover"
                />
              )}
              <button
                onClick={() => setSelected(null)}
                className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-2 font-extrabold text-blackSoft"
              >
                ✕
              </button>
            </div>
            <div className="px-5 pb-5 pt-3">
              <div className="relative">
                {selected.meeting && (
                  <span className="absolute right-0 top-0 rounded-full border border-pinkLight bg-pinkSoft/70 px-3 py-1 text-xs">
                    รวมพล
                  </span>
                )}
                <div
                  className={`text-lg text-blackSoft ${
                    selected.meeting ? "pt-8 font-extrabold" : "font-normal"
                  }`}
                >
                  {selected.title}
                </div>
              </div>
              {(selected.artists?.length ?? 0) > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {(selected.artists || []).map((a) => (
                    <span
                      key={a}
                      className="inline-flex items-center gap-2 rounded-full border border-pinkLight bg-pinkSoft/40 px-3 py-1 text-sm font-semibold"
                    >
                      {ARTIST_ICON[a] && (
                        <img
                          src={ARTIST_ICON[a]}
                          className="h-5 w-5 rounded-lg"
                          alt={a}
                        />
                      )}
                      {a.toUpperCase()}
                    </span>
                  ))}
                </div>
              )}
              <div className="mt-4 text-blackSoft/80">
                {selected.keyword && (
                  <div className="mb-1">{selected.keyword}</div>
                )}
                {selected.hashtag?.map((tag) => (
                  <div key={tag}>{tag}</div>
                ))}
              </div>
              {thumbsOf(selected).length > 0 && (
                <div className="mt-5 grid grid-cols-12 gap-2">
                  {thumbsOf(selected).map((src) => (
                    <div
                      key={src}
                      className="col-span-6 md:col-span-3 aspect-[4/3] overflow-hidden rounded-2xl border border-pinkSoft"
                    >
                      <img src={src} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
              <SocialLinks {...selected} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
