import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/api";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
import Layout from "@/components/Layout";

TimeAgo.addLocale(en);

export default function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetchPosts();
	}, []);

	async function fetchPosts() {
		const user = supabase.auth.user();
		const { data, error } = await supabase
			.from("posts")
			.select("*")
			.filter("user_id", "eq", user.id);
		setPosts(data);
		setLoading(false);
	}
	const excerptPost = (content) => {
		let excerpt = content.substr(1, 110);
		if (content.length > 110) {
			return excerpt + "...";
		} else {
			return excerpt;
		}
	};
	if (loading) return <p className="text-2xl text-center">Loading ...</p>;
	if (!posts.length) return <p className="text-2xl text-center">No posts.</p>;

	return (
		<>
			<Layout title="Home">
				<div className="mb-6 text-right">
					<Link href="/write">
						<a className="px-5 py-2 text-lg text-purple-500 border border-purple-500 rounded-full hover:text-white hover:bg-purple-500">
							+ Write
						</a>
					</Link>
				</div>
				<header className="px-24 mb-8 border-purple-500">
					<h1 className="pb-4 text-5xl font-bold tracking-wide text-center border-b border-purple-400">
						Logs
					</h1>
				</header>
				<div className="px-6">
					{posts.map((post) => (
						<Link key={post.id} href={`/post/${post.id}`}>
							<div className="p-2 mt-4 cursor-pointer hover:bg-blue-50">
								<div className="flex items-center">
									<div className="w-5/6">
										<h2 className="text-xl">
											{post.title}
										</h2>
										<div className="text-gray-500">
											{excerptPost(post.content)}
										</div>
									</div>
									<div className="w-1/6 text-right text-gray-500">
										<ReactTimeAgo
											date={post.inserted_at}
											timeStyle="twitter"
										/>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</Layout>
		</>
	);
}
