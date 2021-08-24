import { useRouter } from "next/router";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/lib/api";
import Layout from "@/components/Layout";

export default function Post({ post }) {
	const router = useRouter();
	if (router.isFallback) {
		return <div className="text-center">Loading...</div>;
	}
	return (
		<>
			<Layout title={post.title} type="single">
				<h1 className="mb-8 text-5xl font-bold tracking-wide text-center">
					{post.title}
				</h1>
				<div className="max-w-4xl p-12 mx-auto bg-white shadow-md rounded-3xl">
					<ReactMarkdown className="prose prose-lg">
						{post.content}
					</ReactMarkdown>
				</div>
			</Layout>
		</>
	);
}

export async function getStaticPaths() {
	const { data, error } = await supabase.from("posts").select("id");
	const paths = data.map((post) => ({
		params: { id: JSON.stringify(post.id) },
	}));
	return {
		paths,
		fallback: true,
	};
}
export async function getStaticProps({ params }) {
	const { id } = params;
	const { data } = await supabase
		.from("posts")
		.select()
		.filter("id", "eq", id)
		.single();

	return {
		props: {
			post: data,
		},
	};
}
