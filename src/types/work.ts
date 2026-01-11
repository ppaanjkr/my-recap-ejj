export type work = {
    movies?: movie[],
    awards?: award[],
    music?: music[],
    shows?: show[]
}
export type movie = {
    id?: string,
    title?: string,
    gernes?: string[],
    year?: string,
    character?: string,
    platform?: string[]
    url?: string,
    poster?: string
    description?: string
}
export type award = {
    id?: string,
    year?: string,
    name?: string,
    description?: string,
    category?: string
    url?: string
    Image?: string
}
export type music = {
    id?: string,
    title?: string,
    url?: string,
    image?: string,
}
export type show = {
    id?: string,
    date?: string,
    title?: string,
    platform?: string,
    url?: string,
}