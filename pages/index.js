import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "../api";

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		const { data, error } = await supabase.from("posts").select();
		setPosts(data);
		setLoading(false);
	}
	if (loading) return <p className="text-2xl">Loading ...</p>;
	if (!posts.length) return <p className="text-2xl">No posts.</p>;

	return (
		<div>
			<h1 className="mt-6 mb-2 text-3xl font-semibold tracking-wide">
				Posts
			</h1>
			{posts.map((post) => (
				<Link key={post.id} href={`/post/${post.id}`}>
					<div className="pb-4 mt-8 border-b border-gray-300 cursor-pointer">
						<h2 className="text-xl font-semibold">{post.title}</h2>
						<p className="mt-2 text-gray-500">
							Author: {post.user_email}
						</p>
					</div>
				</Link>
			))}
		</div>
	);
}
