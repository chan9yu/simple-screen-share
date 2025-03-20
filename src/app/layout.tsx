import "@/shared/styles/globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PropsWithChildren } from "react";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
});

export const metadata: Metadata = {
	title: "Simple Screen Share",
	description: "🖥️ 원격 화면 공유 웹 서비스"
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="ko">
			<body className={`${geistSans.variable} ${geistMono.variable} h-dvh w-dvw antialiased`}>{children}</body>
		</html>
	);
}
