"use client";
import { CldImage } from "next-cloudinary";
import { Heart } from "../../components/icons/heart";
import { FullHeart } from "../../components/icons/full-heart";
import { setAsFavoriteAction } from "./actions";
import { useTransition } from "react";
import { SearchResult } from "./page";

export function CloudinaryImage(props: any & { imageData: SearchResult; path: string }) {
  const [transition, startTransition] = useTransition();
  const { imageData } = props;

  const isFavorited = imageData.tags.includes("favorite");
  return (
    <div className="relative">
      <CldImage {...props} src={imageData.public_id} />
      {isFavorited ? (
        <FullHeart
          className="absolute top-2 right-2 hover:text-white text-red-500 cursor-pointer"
          onClick={() => {
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, false, props.path);
            });
          }}
        />
      ) : (
        <Heart
          className="absolute top-2 right-2 hover:text-red-500 text-white cursor-pointer"
          onClick={() => {
            startTransition(() => {
              setAsFavoriteAction(imageData.public_id, true, props.path);
            });
          }}
        />
      )}
    </div>
  );
}
