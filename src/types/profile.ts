export type Profile = {
    firstnameTH: string,
    firstnameEN: string,
    lastnameTH: string,
    lastnameEN: string,
    nicknameTH: string,
    nicknameEN: string,
    birthday: string,
    // aka?: string[],
    hashtag?: string[],
    LikesAndDislikes?: LikesAndDislikes,
    Allergy?: string[],
    SocialLink?: SocialLink,
    Brands?: Brand[],
    // Images?: string,
    ProfileImage?: ProfileImage[],
    Besties?: Bestie[],
    ContactForWork?: ContactForWork,
    OfficialFanclub?: OfficialFanclub[]
}
export type ProfileImage = {
    name?: string,
    image?: string
}
export type SocialLink = {
    facebook?: string,
    instagram?: string,
    twitter?: string,
    tiktok?: string,
    thread?: string
}
export type Brand = {
    name: string,
    facebook?: string,
    instagram?: string,
    twitter?: string,
    tiktok?: string,
}
export type Bestie = {
    index: number
    relationship? : string
    name?: string
    facebook?: string,
    instagram?: string,
    twitter?: string,
    tiktok?: string,
    Image?: string
}
export type ContactForWork = {
    name?: string,
    entertainment?: string[],
    facebook?: string,
    instagram?: string,
    twitter?: string,
    tiktok?: string,
    mobile?: string,
    email?: string,
    line?: string
}
export type LikesAndDislikes = {
    likeColor? : string[],
    likeFood? : string[],
    dislikeFood? : string[],
    likePet? : string[],
    likeHobby? : string[],
    likeSport? : string[],
    likeCollectible? : string[],
    likeArtist? : string[],
    likeMusic? : string[],
    likeMovie? : string[],
    likePlace? : string[],
}
export type OfficialFanclub = {
    name?: string,
    facebook?: string,
    instagram?: string,
    thread?: string,
    twitter?: string,
    tiktok?: string,
    line?: string,
    logo?: string
}