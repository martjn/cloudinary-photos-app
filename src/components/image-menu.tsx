//import User from "lucide-react/dist/esm/icons/user";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu } from "./icons/menu";
import { Folder } from "./icons/folder";
import { AddToAlbumDialog } from "./ui/add-to-album-dialog";
import { SearchResult } from "@/app/gallery/page";
import { useState } from "react";
import Link from "next/link";
import { Pencil } from "./icons/pencil";

export function ImageMenu({ image }: { image: SearchResult }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="absolute top-2 right-2">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-8 h-8 p-0">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-46">
          <DropdownMenuGroup>
            <DropdownMenuItem asChild className="gap-2">
              <AddToAlbumDialog image={image} onClose={() => setOpen(false)} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="gap-2">
              <Button className="pl-4 cursor-pointer flex justify-start" variant="outline" asChild>
                <Link
                  href={`/edit?publicId=${encodeURIComponent(image.public_id)}`}
                >
                  <Pencil className="w-6 h-6" /> Edit
                </Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
