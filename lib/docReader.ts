import mammoth from "mammoth";

export async function readDOCX(
    arrayBuffer: ArrayBuffer
): Promise<string> {

    try {

        console.log("DOCX PARSER START");

        const buffer = Buffer.from(arrayBuffer);


        const result =
            await mammoth.extractRawText({
                buffer,
            });


        console.log(
            "DOCX EXTRACTED:",
            result.value.substring(0, 200)
        );


        if (!result.value.trim()) {
            throw new Error(
                "DOCX has no readable text"
            );
        }


        return result.value;


    } catch (error) {

        console.error(
            "DOCX ERROR:",
            error
        );

        throw new Error(
            "Failed to extract DOCX text"
        );

    }
}