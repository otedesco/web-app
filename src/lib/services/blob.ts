import { put } from "@vercel/blob";

export const uploadAvatar = async (fileString?: string, path?: string) => {
  if (!fileString) return;

  if (!fileString.startsWith("data:image/")) {
    throw new Error("Invalid file format");
  }

  const format = fileString.split(";")[0]?.split("/")[1];
  const filename = `avatar/${path}.${format}`;
  const file = Buffer.from(fileString.split("base64,")[1]!, "base64");
  const blob = await put(filename, file, {
    access: "public",
  });

  return blob.url;
};
