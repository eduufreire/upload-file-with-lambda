import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import pino from "pino";

export const sendFile = async (keyName: string, image: Buffer) => {
  try {
    const client = new S3Client({ region: "us-east-1" });

    const input = {
      Body: image,
      Bucket: "s3-02231002",
      Key: keyName,
    };

    const command = new PutObjectCommand(input);
    const result = await client.send(command);
    if (result) {
      return result;
    }
  } catch (err) {
    throw new Error("Erro ao tentar enviar imagem ao S3");
  }
};
