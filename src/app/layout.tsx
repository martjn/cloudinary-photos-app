import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Heart } from "../components/icons/heart";

import Link from "next/link";
import { Folder as FolderIcon } from "@/components/icons/folder";
import { Folder } from "@/app/albums/page";
import cloudinary from "cloudinary";
import Image from "next/image";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Photos application",
  description: "Photo app built with next, cloudinary and shadcn",
};

const SideMenu = async () => {
  const { folders } = (await cloudinary.v2.api.root_folders()) as {
    folders: Folder[];
  };
  return (
    <div className="pb-12 w-1/5">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Manage
          </h2>
          <div className="space-y-1">
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start gap-2"
            >
              <Link href="gallery">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                Gallery
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start gap-2"
            >
              <Link href="/albums">
                <FolderIcon />
                Albums
              </Link>
            </Button>
            {folders.map((folder) => (
              <Button variant="ghost" asChild key={folder.name} className="w-full justify-start gap-2">
                <Link className="pl-8" href={`/albums/${folder.path}`}>{folder.name}</Link>
              </Button>
            ))}
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start gap-2"
            >
              <Link href="/favorites">
                {" "}
                <Heart />
                Favorites
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="border-b">
          <div className="flex h-16 items-center px-4 container mx-auto gap-2">
            <Image src="/album.png" width="40" height="40"/>
            Martin&apos;s Photos
            <div className="ml-auto flex items-center space-x-4" alt="icon of this app">
              <Avatar>
                <AvatarImage
                  src="https://sadanduseless.b-cdn.net/wp-content/uploads/2022/11/crocs-hat7.jpg"
                  alt="@shadcn"
                />
                <AvatarFallback>MT</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <div className="flex">
          <SideMenu />
          <div className="w-full px-4 pt-12">{children}</div>
        </div>
      </body>
    </html>
  );
}
