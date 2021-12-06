import mime from "mime";
import { S3 } from "aws-sdk";
import fs from "fs";
import { resolve } from "path";

import upload from "@config/upload";
import { IStorageProvider } from "../IStorageProvider";
import { injectable } from "tsyringe";

@injectable()
export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    try {
      this.client = new S3({
        region: process.env.AWS_BUCKET_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  async save(file: string, folder: string): Promise<string> {
    try {
      await fs.promises.rename(
        resolve(upload.tmpFolder, file),
        resolve(`${upload.tmpFolder}/${folder}`, file)
      )

      const originalName = resolve(`${upload.tmpFolder}/${folder}`, file);

      const fileContent = await fs.promises.readFile(originalName);

      const ContentType = mime.getType(originalName);

      await this.client.putObject({
        Bucket: `${process.env.AWS_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      }).promise();

      await fs.promises.unlink(originalName);

      return file;
    } catch (err) {
      console.log(err);
    }
  }


  async delete(file: string, folder: string): Promise<void> {
    await this.client.deleteObject({
      Bucket: `${process.env.AWS_BUCKET}/${folder}`,
      Key: file,
    }).promise();
  }
}