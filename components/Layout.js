import React from "react";
import Head from "next/head";
//import Header from "@/components/Header";
//import Footer from "@/components/Footer";

export default function Layout({ title, children, type }) {
	return (
		<>
			<Head>
				<meta charset="utf8" />
				<title>{title}</title>
			</Head>
			{type === "single" ? (
				<>
					<main className="">{children}</main>
				</>
			) : (
				<main className="max-w-5xl p-12 mx-auto bg-white shadow-md rounded-3xl">
					{children}
				</main>
			)}
		</>
	);
}
