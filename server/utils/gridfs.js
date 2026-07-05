import mongoose from 'mongoose';
import { GridFSBucket, ObjectId } from 'mongodb';

let bucket;

function getBucket() {
  if (!bucket) {
    bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
  }
  return bucket;
}

export async function storeFile(buffer, { filename, mimetype }) {
  const bucket = getBucket();
  const id = new ObjectId();

  await new Promise((resolve, reject) => {
    const stream = bucket.openUploadStreamWithId(id, filename, {
      contentType: mimetype,
      metadata: { uploadedAt: new Date().toISOString() },
    });

    stream.on('error', reject);
    stream.on('finish', resolve);
    stream.end(buffer);
  });

  return id.toString();
}

export const storeImage = storeFile;

export function openImageStream(id) {
  return getBucket().openDownloadStream(new ObjectId(id));
}

export function isValidMediaId(id) {
  return ObjectId.isValid(id);
}