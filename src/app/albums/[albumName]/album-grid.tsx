"use client";
import { CloudinaryImage } from "../../../components/cloudinary-image";
import { ImageGrid } from "@/components/image-grid";
import { SearchResult } from "../../gallery/page";

export default function AlbumGrid({images}: {images: SearchResult[]}) {
  return (
    <ImageGrid
      images={images}
      getImage={(imageData: SearchResult) => {
        return (
          <CloudinaryImage
            key={imageData.public_id}
            imageData={imageData}
            alt="an image of something"
            width="400"
            height="300"
          />
        );
      }}
    />
  );
}
