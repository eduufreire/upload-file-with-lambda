import dayjs from "dayjs";
import { logger } from "../utils/globals";

type ProcessedImage = {
  image: Buffer;
  keyFile: string;
};

export function processImage(imageEncoded: string): ProcessedImage {
  try {
    const imageBase64 = Buffer.from(imageEncoded, "base64");

    const keyFileName = `image-${Date.now()}-${dayjs().format("YYYYMMDD")}.jpg`;
    
    const result = {
      image: imageBase64,
      keyFile: keyFileName,
    }
    logger.info({name: "processImage", message: "successfully processed image"})

    return result

  } catch (err) {
    const error = err as Error
    logger.error({name: "processImage", error: error.message})
    throw new Error('Falha ao processar a imagem')
  }
}
