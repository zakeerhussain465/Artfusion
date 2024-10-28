import { NextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

interface props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: props) {
  const session = await getServerSession(NextAuthOptions);

  if (session?.user && session?.user?.role == "ARTIST") redirect("/artist");
  if (session?.user && session?.user?.role == "PROD_OWNER")
    redirect("/production");

  return <div>{children}</div>;
}
