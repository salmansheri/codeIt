"use client";

import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  disabled,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-4 flex w-full flex-col justify-center items-center ">
      <CldUploadButton
        onUpload={(result: any) => onChange(result.info.secure_url)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset="bqhk6xj4"
        className="z-[999]"
      >
        <div className="p-4 border-4 border-dashed border-primary/10 hover:opacity-75 transition rounded-lg flex flex-col space-y-2 items-center justify-center">
          <div className="relative h-40 w-40">
            <Image
              src={value || "/placeholder.png"}
              alt="avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
