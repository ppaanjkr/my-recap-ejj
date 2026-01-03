// "use client";

// import { useEffect } from "react";
// import { useSheetEvents } from "@/hooks/useSheetEvents";

// export default function HomePage() {
//   const { items, loading, error } = useSheetEvents();

//   useEffect(() => {
//     if (!loading) {
//       console.log("items from sheet:", items);
//     }
//   }, [loading, items]);

//   return (
//     <div style={{ padding: 24 }}>
//       <div>loading: {String(loading)}</div>
//       {error && <div style={{ color: "red" }}>error: {error}</div>}
//       <div>items length: {items.length}</div>
//       <div>เปิด DevTools → Console เพื่อดูข้อมูล</div>
//       <ul>
//         {items.map((it) => (
//           <li key={it.id}>
//             {it.date} — {it.title}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";

import { useSheetEvents } from "@/hooks/useSheetEvents";

export default function HomePage() {
  const { items, loading, error } = useSheetEvents();

  if (loading) return <div className="p-10">กำลังโหลดข้อมูล...</div>;
  if (error) return <div className="p-10 text-red-500">เกิดข้อผิดพลาด: {error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Event Calendar</h1>
      <div className="space-y-8">
        {items.map((it) => (
          <div key={it.id} className="border-b pb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm font-mono">
                {it.date}
              </span>
              <h2 className="text-xl font-semibold">{it.title}</h2>
            </div>
            
            <p className="text-gray-600 mb-4">{it.desc}</p>

            {/* แสดงรูปภาพหลายรูป */}
            {it.images && it.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                {it.images.map((imgUrl, index) => (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`${it.title} - ${index}`}
                    className="rounded-lg object-cover w-full h-40 bg-gray-100"
                    // กรณีรูปโหลดไม่ติด
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                ))}
              </div>
            )}

            {/* ส่วนของ Hashtags */}
            {it.hashtag && it.hashtag.length > 0 && (
              <div className="flex gap-2 mt-3">
                {it.hashtag.map((tag) => (
                  <span key={tag} className="text-blue-500 text-sm italic">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}