export const basePath = process.env.NODE_ENV === "production" ? "/my-recap-ejj" : "";
export const withBasePath = (p: string) => `${basePath}${p}`;
