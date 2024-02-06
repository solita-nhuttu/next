"use client";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";

const FileUploader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [urls, setUrls] = useState<Array<string> | null>();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const temporaryUrl = URL.createObjectURL(file);
      setSelectedFile(file);
      setImageUrl(temporaryUrl);
    }
  };

  const uploadToAzure = async () => {
    if (selectedFile) {
      const data = new FormData();
      data.set("file", selectedFile);
      const res = await fetch(`/api/file?filename=${selectedFile.name}`, {
        method: "POST",
        body: data,
      });
      console.log(res);
      return res;
    }
  };

  const fetchURLsFromAzure = async () => {
    const res = await fetch("api/file", {
      method: "GET",
    });

    if (res.ok) setUrls(await res.json());
  };

  return (
    <div className="flex min-h-96 items-center justify-center">
      <input type="file" onChange={handleFileChange} />
      {selectedFile && (
        <div>
          <p>Selected File: {selectedFile.name}</p>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Uploaded File"
              style={{ maxWidth: "100%", maxHeight: "200px" }}
            />
          )}
        </div>
      )}

      <div className="flex flex-col justify-between gap-9 bg-slate-400">
        <button onClick={() => uploadToAzure()} className="bg-red-300">
          Upload file to Azure!
        </button>

        <button onClick={() => fetchURLsFromAzure()}>
          Fetch data from Azure!
        </button>

        {urls?.length &&
          urls.map((url, i) => (
            <a key={i} href={url}>
              {url}
            </a>
          ))}
      </div>
    </div>
  );
};

export default FileUploader;
