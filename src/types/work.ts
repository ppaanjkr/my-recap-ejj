export type WorkItem = {
    id: string;
    year: string;
    title: string;
    type: string;
    desc?: string;
    poster?: string;
    artist?: string;
    character?: string;
    platforms?: string;
    status?: string | "0" | "1" | "9"; // 0 = on-air, 1 = coming soon, 9 = finished
}