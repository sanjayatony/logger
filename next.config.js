module.exports = {
	reactStrictMode: true,
	env: {
    GOTRUE_SITE_URL=process.env.GOTRUE_SITE_URL,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY:
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
	},
};
