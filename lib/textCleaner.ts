export function cleanText(text:string){

    return text
    .replace(/\s+/g," ")
    .replace(/[^\w\s.@+-]/g," ")
    .trim();

}