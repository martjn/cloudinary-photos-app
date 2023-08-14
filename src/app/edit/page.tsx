"use client";
import { Button } from "@/components/ui/button";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EditPage({
  searchParams: { publicId },
}: {
  searchParams: { publicId: string };
}) {
  const [transformation, setTransformation] = useState<
    | undefined
    | "generative-fill"
    | "blur"
    | "grayscale"
    | "pixelate"
    | "remove-background"
  >();
  const [prompt, setPrompt] = useState("");
  const [pendingPrompt, setPendingPrompt] = useState("");
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
          <div className="flex flex-col gap-4">
            <Button onClick={() => {
              setTransformation("generative-fill")
              setPrompt(pendingPrompt)
              }}>
              Apply Generative Fill
            </Button>
            <Label>Prompt</Label>
            <Input
              value={pendingPrompt}
              onChange={(e) => setPendingPrompt(e.currentTarget.value)}
            />
          </div>
          <Button onClick={() => setTransformation("blur")}>Blur image</Button>
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

        <div className="grid grid-cols-2 gap-12">
          <CldImage src={publicId} width="400" height="300" alt="some image" />
          {transformation === "generative-fill" && (
            <CldImage
              src={publicId}
              width="1800"
              height="1200"
              alt="some image"
              crop="pad"
              fillBackground={{
                prompt,
              }}
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
