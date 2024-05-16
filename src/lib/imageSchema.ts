import * as Yup from "yup";

interface MyFile {
  type: string;
}

export const imageSchema = Yup.mixed().test(
  "is-image",
  "Invalid image format",
  (value: any) => {
    // Use `any` or a more permissive type here
    const file: MyFile | null | undefined = value as MyFile | null | undefined;

    if (!file) {
      return true; // Passing validation if no file is provided or if the value is null/undefined
    }

    // Extracting the file type to determine if it's an image
    const fileType = file.type.toLowerCase(); // Ensure case-insensitive comparison

    const validFormats = ["image/png", "image/jpeg", "image/jpg"];

    // Check if the file type is within the allowed formats
    return validFormats.includes(fileType);
  }
);
