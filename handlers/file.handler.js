import * as fs from "fs";
import * as path from "path";
import * as url from "url";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const deleteFile = async (image) => {
  if (!image) return;

  try {
    let imgPath = image.replace(process.env.SERVER_HOST, "");

    if (imgPath.startsWith("/")) {
      imgPath = imgPath.slice(1);
    }

    let absolutePath = path.join(__dirname, imgPath);

    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
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
