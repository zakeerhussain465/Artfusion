"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface props {
  children: React.ReactNode;
}

export default function FavouritesLayout({ children }: props) {
  const router = useRouter();
  return (
    <div className="h-full w-full bg-white shadow-sm">
      <div
        className="bg-white sticky -top-2  flex items-center gap-4"
        style={{ padding: "1rem" }}
      >
        <Button
          onClick={() => {
            router.back();
          }}
          variant={"ghost"}
          className="rounded-full p-1 h-10 w-10 hover:bg-indigo-300 hover:text-primary"
        >
          <AiOutlineArrowLeft className="text-xl" />
        </Button>
        <h3 className="text-xl">My Favourites</h3>
      </div>
      {children}
    </div>
  );
}
