import { createReadStream } from "fs";
import * as AWS from "aws-sdk";

/// <reference types="aws-sdk" />

AWS.config.update({
  // login
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "jang-instacloneuploader-v2",
      Key: objectName,
      ACL: "public-read-write", // 엑세스 접근제어 - 누구나 읽고 쓰기 가능
      Body: readStream, //file stream
    })
    .promise();
  return Location;
};

export const handleDeletePhotoFromAWS = async (fileUrl) => {
  const decodedUrl = decodeURI(fileUrl); //fileurl -> decode
  const filePath = decodedUrl.split("/uploads/")[1];
  console.log(filePath);
  const fileName = `uploads/${filePath}`;

  await new AWS.S3()
    .deleteObject({
      Bucket: "jang-instacloneuploader-v2",
      Key: fileName,
    })
    .promise();
};
