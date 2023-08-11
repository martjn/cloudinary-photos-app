"use client";
import { CldImage, CldImageProps } from "next-cloudinary";
import { Heart } from "../../components/icons/heart";
import { FullHeart } from "../../components/icons/full-heart";
import { setAsFavoriteAction } from "./actions";
import { useTransition } from "react";
import { SearchResult } from "./page";
import { useState } from "react";

export function CloudinaryImage(
  props: {
    imageData: SearchResult;
    onUnheart?: (unheartedResource: SearchResult) => void;
  } & Omit<CldImageProps, 'src'>
) {
  const [transition, startTransition] = useTransition();
  const { imageData, onUnheart } = props;
  const [isFavorited, setIsFavorited] = useState(
    imageData.tags.includes("favorite")
  );
  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      {isFavorited ? (
        <FullHeart
          className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer"
          onClick={() => {
            onUnheart?.(imageData);
            setIsFavorited(false);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, false);
            });
          }}
        />
      ) : (
        <Heart
          className="absolute top-2 right-2 hover:text-red-500 text-white cursor-pointer"
          onClick={() => {
            setIsFavorited(true);
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, true);
            });
          }}
        />
      )}
    </div>
  );
}
