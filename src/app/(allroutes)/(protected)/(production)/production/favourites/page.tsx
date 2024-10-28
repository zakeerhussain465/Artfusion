"use client";
import FeedCard from "@/components/sub-components/FeedCard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { ArtistSelector } from "@/store/artists.slice";
import { LikesSelector } from "@/store/likes.slice";
import { BsBox2Heart } from "react-icons/bs";

export default function FavouritesPage() {
  const likedIds = useAppSelector(LikesSelector.selectIds);
  const artistProfile = useAppSelector(ArtistSelector.selectEntities);

  if (!likedIds.length || typeof artistProfile == "undefined")
    return (
      <div className="flex items-center justify-center h-1/2 w-full flex-col gap-4 py-20" style={{paddingTop:"60px",paddingBottom:"60px"}}>
        <BsBox2Heart style={{ fontSize: "72px" }} className="text-pink-600" />
        <span className="text-xl">No Favourite list yet !</span>
      </div>
    );

  return (
    <div className="w-full h-fit flex flex-col">
      {likedIds.map((id) => {
        return <FeedCard key={id} viewProfile className="rounded-none" feed={artistProfile[id]!} />;
      })}
    </div>
  );
}
