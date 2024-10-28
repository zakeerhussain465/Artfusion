"use client";

import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/hooks";
import { useAppSelector } from "@/store";
import { ProjectSelector, fetchIntialProduction, fetchMyProduction } from "@/store/productions.slice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

interface props {
  children: React.ReactNode;
}

export default function MyProjectsLayout({ children }: props) {
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;
  const dispatch = useAppDispatch();
  const isProjectsExist = useAppSelector(ProjectSelector.selectTotal)

  if(!isProjectsExist && user) dispatch(fetchMyProduction(user.id!));

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
        <h3 className="text-xl">My Projects</h3>
      </div>
      {children}
    </div>
  );
}
