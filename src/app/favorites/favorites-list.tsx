'use client'
import cloudinary from "cloudinary";
import { CloudinaryImage } from "../gallery/cloudinary-image";
import { SearchResult } from "../gallery/page";
import { ForceRefresh } from "@/components/force-refresh";
import { useEffect, useState } from "react";

export default function FavoritesList({
  initialResources,
}: {
  initialResources: SearchResult[];
}) {
  const [resources, setResources] = useState(initialResources);

  useEffect(() => {
    setResources(initialResources)
  },[initialResources])
  return (
    <div className="grid grid-cols-4">
      {resources.map((result) => (
        <CloudinaryImage
          key={result.public_id}
          imageData={result}
          alt="an image of something"
          width="400"
          height="300"
          onUnheart={(unheartedResource) => {
            setResources((currentResources) => 
              currentResources.filter(
                (resource) => resource.public_id !== unheartedResource.public_id
              )
              )
          }}
        />
      ))}
    </div>
  );
}
