import { techKeywords } from "./keywords";


export function calculateATSScore(
    text: string
) {

    const lower =
        text.toLowerCase();


    let score = 0;


    // ----------------
    // Sections
    // ----------------

    const sections = [
        "summary",
        "objective",
        "skills",
        "experience",
        "education",
        "projects"
    ];


    let sectionScore = 0;


    sections.forEach(section => {

        if (
            lower.includes(section)
        ) {
            sectionScore += 8;
        }

    });


    score += Math.min(sectionScore, 40);



    // ----------------
    // Contact info
    // ----------------


    if (
        lower.includes("@")
    ) {
        score += 5;
    }


    if (
        /\d{10}/.test(text)
    ) {
        score += 5;
    }



    // ----------------
    // Length
    // ----------------


    if (text.length > 1000) {
        score += 15;
    }
    else if (text.length > 500) {
        score += 8;
    }



    // ----------------
    // Keywords
    // ----------------


    let found = 0;


    techKeywords.forEach(keyword => {

        if (
            lower.includes(keyword)
        ) {
            found++;
        }

    });


    score += Math.min(found * 2, 25);



    return Math.min(score, 100);

}