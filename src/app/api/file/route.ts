// pages/api/upload.js

import { BlobServiceClient, BlockBlobUploadOptions } from "@azure/storage-blob";
import { NextRequest, NextResponse } from "next/server";

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_CONNECTION_STRING ?? "";

console.log(AZURE_STORAGE_CONNECTION_STRING, "heiii");

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();

  const file: File | null = data.get("file") as unknown as File;

  console.log(file);

  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING,
  );

  const containerName = "$web";

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const blobName = file.name;

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  const options: BlockBlobUploadOptions = {
    blobHTTPHeaders: { blobContentType: file.type },
  };

  if (!file) {
    return NextResponse.error();
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadBlobResponse = await blockBlobClient.upload(
    buffer,
    buffer.length,
    options,
  );

  return NextResponse.json(uploadBlobResponse);
}

export async function GET(req: NextRequest, res: NextResponse) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING,
  );

  const containerName = "$web";

  const containerClient = blobServiceClient.getContainerClient(containerName);

  const q = [];

  for await (const blob of containerClient.listBlobsFlat()) {
    const blockBlobClient = containerClient.getBlockBlobClient(blob.name);

    q.push(blockBlobClient.url);
  }

  return NextResponse.json(q);
}
