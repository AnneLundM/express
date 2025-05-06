import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const deleteFile = async (image) => {
  if (!image) return;

  // Beskyttede filnavne, som ikke må slettes
  const protectedFilenames = ["ninja.png", "no-image.jpg"];

  try {
    let imgPath = image.replace(process.env.SERVER_HOST, "");

    if (imgPath.startsWith("/")) {
      imgPath = imgPath.slice(1);
    }

    const absolutePath = path.join(__dirname, imgPath);
    const filename = path.basename(absolutePath);

    if (protectedFilenames.includes(filename)) {
      console.log(`Filen "${filename}" er beskyttet og bliver ikke slettet.`);
      return;
    }

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(`Filen "${filename}" blev slettet.`);
    } else {
      console.warn(`Filen findes ikke: ${absolutePath}`);
    }
  } catch (error) {
    console.error(`Kunne ikke slette fil: ${image}`, error);
  }
};

export const deleteProductImage = async (imagePath) => {
  try {
    await deleteFile(imagePath);
  } catch (error) {
    console.error(`Failed to delete image: ${imagePath}`, error);
  }
};

export const deleteUserImage = async (imagePath) => {
  try {
    await deleteFile(imagePath);
  } catch (error) {
    console.error(`Failed to delete image: ${imagePath}`, error);
  }
};
