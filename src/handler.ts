import sharp from "sharp";
import { sendFile } from "./services/s3-service";
import dayjs from 'dayjs'

export const handler = async (event: any) => {
  try {

    const image = Buffer.from(event.body, "base64");
    const keyFileName = `image-${Date.now()}-${dayjs().format("YYYYMMDD")}.jpg`

    const resultFile = await sendFile(keyFileName, image)

    let etag = ''
    if(resultFile?.ETag) {
      etag = resultFile?.ETag
    }

    return {
      statusCode: 200,
      body: {
        url: `https://s3-02231002.s3.amazonaws.com/${keyFileName}`,
        eTagFile: sanitazeString(etag)
      },
    };

  } catch (err) {
    console.log(err)
    return {
      statusCode: 400,
    };
  }
};

function sanitazeString(text: string): string {
  return text.replace(/[^a-zA-Z0-9\s]/g, '')
}
