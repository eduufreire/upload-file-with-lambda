import { logger, isBase64, removeCharacters } from "./utils/globals";
import { processImage } from "./services/image-service";
import { sendFile } from "./services/s3-service";

export const handler = async (event: any) => {

  try {

    if(!event.content) {
      logger.info({name: "handler.init", content: {bodyIsValid: !!event.content}})
      throw new Error('content invalid type')
    }

    if(!isBase64(event.content)) {
      throw new Error('invalid base64')
    }
    
    const resultImage = processImage(event.content)

    const resultFile = await sendFile(resultImage.keyFile, resultImage.image)
    
    let etag = ''
    if(resultFile?.ETag) {
      etag = resultFile?.ETag
    }

    logger.info({name: "handler.resultFileS", content: etag})

    return {
      statusCode: 200,
      body: {
        url: `https://s3-02231002.s3.amazonaws.com/${resultImage.keyFile}`,
        eTagFile: removeCharacters(etag)
      },
    };

  } catch (err) {
    const error = err as Error
    logger.error({name: "handler", error: error.message}) 
    return {
      statusCode: 400,
      error: error.message
    };
  }
};

