import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/api";
import ReactMarkdown from "react-markdown";
import Layout from "@/components/Layout";
export default function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetchPosts();
		const mySubscription = supabase
			.from("posts")
			.on("*", () => fetchPosts())
			.subscribe();
		return () => supabase.removeSubscription(mySubscription);
	}, []);

	async function fetchPosts() {
		const { data, error } = await supabase.from("posts").select();
		setPosts(data);
		setLoading(false);
	}
	if (loading) return <p className="text-2xl">Loading ...</p>;
	if (!posts.length) return <p className="text-2xl">No posts.</p>;

	return (
		<>
			<Layout title="Home">
				<h1 className="mb-2 text-4xl font-bold tracking-wide text-center">
					Logs
				</h1>
				{posts.map((post) => (
					<Link key={post.id} href={`/post/${post.id}`}>
						<div className="pb-4 mt-8 border-b border-gray-300 cursor-pointer">
							<h2 className="text-xl font-semibold">
								{post.title}
							</h2>
							<ReactMarkdown>{post.content}</ReactMarkdown>
							<p className="mt-2 text-gray-500">
								Author: {post.user_email}
							</p>
						</div>
					</Link>
				))}
			</Layout>
		</>
	);
}
