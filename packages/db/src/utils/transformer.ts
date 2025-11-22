export const lowerCaser = {
    from: (value:string): string => value,
    to: (value:string): string => (typeof value === "string" ? value.toLowerCase() : value) 
}