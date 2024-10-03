import { S3Client, PutObjectCommand, PutObjectCommandOutput } from "@aws-sdk/client-s3";
import { logger } from "../utils/globals";

export async function sendFile(
  keyName: string,
  image: Buffer
): Promise<PutObjectCommandOutput | undefined> {
  try {
    const client = new S3Client({ region: "us-east-1" });

    const input = {
      Body: image,
      Bucket: "s3-02231002",
      Key: keyName,
    };

    logger.info({name: "s3Service", content: {
      bucket: input.Bucket,
      keyFile: input.Key
    }})

    const command = new PutObjectCommand(input);
    const result = await client.send(command);
    if (result) {
      return result;
    }
  } catch (err) {
    const error = err as Error
    logger.error({name: "s3Service", error: error.message})
    throw new Error('Erro ao enviar imagem ao S3')
  }
}
