// lib/pdfReader.ts

export async function readPDF(arrayBuffer: ArrayBuffer): Promise<string> {
  try {
    const buffer = Buffer.from(arrayBuffer);

    const pdfParse = (await import("pdf-parse")).default;

    const result = await pdfParse(buffer);

    const text = result.text?.trim() || "";

    if (!text) {
      throw new Error(
        "This PDF has no selectable text. It may be a scanned/image PDF."
      );
    }

    return text;

  } catch (error) {
    console.error("PDF read error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown PDF parsing error";

    throw new Error(`Failed to read PDF file: ${message}`);
  }
}