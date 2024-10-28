"use client";
import ArtistTabProfile from "@/components/sub-components/ArtistTabProfile";
import FeedCard from "@/components/sub-components/FeedCard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { ArtistSelector } from "@/store/artists.slice";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

export default function ViewArtistProfile() {
  const params = useParams();
  const artistId = params.artistId;
  const artistProfile = useAppSelector((state) =>
    ArtistSelector.selectById(state, artistId)
  );
  const router = useRouter();

  if (!artistProfile) return <h1>Loading...</h1>;

  return (
    <div className="relative">
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
        <h3 className="text-xl">{"Talent's Profile"}</h3>
      </div>
      <FeedCard
        className="rounded-none rounded-t-xl hover:cursor-auto hover:border-gray-300 hover:bg-white active:scale-100"
        feed={artistProfile}
      />
      <div>
        <ArtistTabProfile />
      </div>
    </div>
  );
}
