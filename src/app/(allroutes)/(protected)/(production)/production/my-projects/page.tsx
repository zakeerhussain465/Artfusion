"use client";
import ProjectCard from "@/components/sub-components/ProjectCard";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store";
import { ProjectSelector } from "@/store/productions.slice";
import Link from "next/link";
import React from "react";
import { BsCameraReels } from "react-icons/bs";

export default function MyProjectsPage() {
  const projects = useAppSelector(ProjectSelector.selectAll);
  const projectsCount = useAppSelector(ProjectSelector.selectTotal);
  const isLoading = useAppSelector((state) => state.project.isLoading);

  if (isLoading) return <h1>Loading projects...</h1>;
  
  if(projectsCount == 0) return (
    <div className="flex items-center justify-center h-1/2 w-full flex-col gap-4 py-20" style={{paddingTop:"60px",paddingBottom:"60px"}}>
      <BsCameraReels style={{ fontSize: "72px" }} className="text-pink-600" />
      <span className="text-xl">No Productions Created Yet</span>
      <Button variant={"ghost"} className="text-primary">Create New Production</Button>
    </div>
  );

  return (
    <div
      className="grid gap-3"
      style={{
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        height: "auto",
        padding:"20px"
      }}
    >
      {projects.map((feed) => (
        <Link key={feed.id} href={`/production/my-projects/v/${feed.id}`}>
          <ProjectCard {...{ feed }} />
        </Link>
      ))}
    </div>
  );
}
