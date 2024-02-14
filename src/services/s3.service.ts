import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";
import path from "path";

import { configs } from "../configs/configs";

class S3Service {
  constructor(
    private s3Client = new S3Client({
      region: configs.AWS_S3_REGION,
      credentials: {
        accessKeyId: configs.AWS_S3_ACCESS_,
        secretAccessKey: configs.AWS_S3_SECRET,
      },
    }),
  ) {}
  private buildPath(itemType, itemId, fileName) {
    return `${itemType}/${itemId}/${crypto.randomUUID()}${path.extname(fileName)}`;
  }
  public async uploadFile(
    file: UploadedFile,
    itemType: "user" | "posters",
    itemId: string,
  ) {
    const filePath = this.buildPath(itemType, itemId, file.name);
    await this.s3Client.send(
      new PutObjectCommand({
        Key: filePath,
        Bucket: configs.AWS_S3_BUCKET,
        Body: file.data,
        ContentType: file.mimetype,
        ACL: "public-read",
      }),
    );
    return filePath;
  }

  public async deleteFile(filePath: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Key: filePath,
        Bucket: configs.AWS_S3_BUCKET,
      }),
    );
  }
}

export const s3Service = new S3Service();
