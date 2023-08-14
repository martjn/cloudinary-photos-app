"use client";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

export default function EditPage({
  searchParams: { publicId },
}: {
  searchParams: { publicId: string };
}) {
  const [transformation, setTransformation] = useState<
    undefined | "generative-fill" | "blur" | "grayscale" | "pixelate" | "remove-background"
  >();
  return (
    <section>
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <h1 className="text-4xl">Edit {publicId}</h1>
        </div>
        <div className="flex gap-4">
          <Button
            variant="destructive"
            onClick={() => setTransformation(undefined)}
          >
            Clear All
          </Button>
          <Button onClick={() => setTransformation("generative-fill")}>
            Apply Generative Fill
          </Button>
          <Button onClick={() => setTransformation("blur")}>
            Blur image
          </Button>
          <Button onClick={() => setTransformation("grayscale")}>
            Convert to gray
          </Button>
          <Button onClick={() => setTransformation("pixelate")}>
            Pixelate image
          </Button>
          <Button onClick={() => setTransformation("remove-background")}>
            Remove background
          </Button>
        </div>

        <div className="flex gap-12">
          <CldImage src={publicId} width="400" height="400" alt="some image" />
          {transformation === "generative-fill" && (
            <CldImage
              src={publicId}
              width="400"
              height="400"
              alt="some image"
              crop="pad"
              fillBackground
            />
          )}
          {transformation === "blur" && (
            <CldImage
              src={publicId}
              width="400"
              height="400"
              blur="800"
              alt="some image"
              
            />
          )}
          {transformation === "grayscale" && (
            <CldImage
              src={publicId}
              width="400"
              height="400"
              grayscale
              alt="some image"
              
            />
          )}
          {transformation === "pixelate" && (
            <CldImage
              src={publicId}
              width="400"
              height="400"
              pixelate
              alt="some image"
              
            />
          )}
          {transformation === "remove-background" && (
            <CldImage
              src={publicId}
              width="400"
              height="400"
              removeBackground
              alt="some image"
              
            />
          )}
        </div>
      </div>
    </section>
  );
}
