import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/store";
import { useAnimate, usePresence } from "framer-motion";
import { useEffect } from "react";
import { Button } from "./button";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addOneLike, removeOneLike } from "@/store/likes.slice";

export const LikeButton = ({ postId }: { postId: string }) => {
  const LikeIds = useAppSelector((state) => state.likes.ids);
  const isLiked = LikeIds?.includes(postId);
  const dispatch = useAppDispatch();
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  async function onLike() {
    if (isLiked) dispatch(removeOneLike(postId));
    else dispatch(addOneLike(postId));
  }

  useEffect(() => {
    async function onAnimate() {
      await animate(
        scope.current,
        { scale: [1, 1.4, 1] },
        { duration: 0.2, bounce: 10, bounceDamping: 23, bounceStiffness: 30 }
      );
    }
    if (isPresent) {
      onAnimate();
    } else {
      safeToRemove();
    }
  }, [isLiked,isPresent,scope]);

  return (
    <Button
      onClick={onLike}
      variant={"ghost"}
      className="rounded-full p-1 h-10 w-10 hover:bg-pink-100 hover:text-pink-500"
    >
      <div ref={scope}>
        {isLiked ? (
          <AiFillHeart className="text-xl text-pink-500" />
        ) : (
          <AiOutlineHeart className="text-xl" />
        )}
      </div>
    </Button>
  );
};
