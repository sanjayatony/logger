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
	const excerptPost = (content) => {
		let excerpt = content.substr(1, 120);
		if (content.length > 120) {
			return excerpt + "...";
		} else {
			return excerpt;
		}
	};
	const formatdate = (date) => {};
	if (loading) return <p className="text-2xl text-center">Loading ...</p>;
	if (!posts.length) return <p className="text-2xl text-center">No posts.</p>;

	return (
		<>
			<Layout title="Home">
				<header className="px-2 border-purple-500mb-8">
					<h1 className="pb-4 text-4xl font-bold tracking-wide text-center border-b border-purple-400">
						Logs
					</h1>
				</header>
				{posts.map((post) => (
					<Link key={post.id} href={`/post/${post.id}`}>
						<div className="p-2 mt-4 cursor-pointer hover:bg-blue-50">
							<div className="flex">
								<div>
									<h2 className="text-xl">{post.title}</h2>
									<div className="text-gray-500">
										{excerptPost(post.content)}
									</div>
								</div>
								<div>{post.inserted_at}</div>
							</div>
						</div>
					</Link>
				))}
			</Layout>
		</>
	);
}
