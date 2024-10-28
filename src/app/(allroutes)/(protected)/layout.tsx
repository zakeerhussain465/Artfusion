interface props {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: props) {
  return <>{children}</>;
}
