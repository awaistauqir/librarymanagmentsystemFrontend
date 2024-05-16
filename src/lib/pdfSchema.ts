import { mixed } from "yup";

interface MyFile {
  type: string;
}

export const pdfSchema = mixed().test(
  "is-pdf",
  "Invalid PDF format",
  (value: any) => {
    const file: MyFile | null | undefined = value as MyFile | null | undefined;

    if (!file) {
      return true; // Passing validation if no file is provided or if the value is null/undefined
    }

    const fileType = file.type.toLowerCase();
    const validFormats = ["application/pdf"]; // Only allow PDF format

    return validFormats.includes(fileType);
  }
);
