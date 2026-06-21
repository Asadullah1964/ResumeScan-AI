import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Resume ATS Checker",
  description: "AI powered ATS resume analyzer",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


return (
<html lang="en">

<body>

{children}

</body>

</html>
);

}