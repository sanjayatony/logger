import { Auth, Typography, Button } from "@supabase/ui";
const { Text } = Typography;
import { supabase } from "@/lib/api";
import Layout from "@/components/Layout";

function Profile(props) {
	const { user } = Auth.useUser();
	if (user)
		return (
			<>
				<Text>Signen in: {user.email}</Text>
				<Button
					block
					onClick={() => props.supabaseClient.auth.signOut()}
				>
					Sign out
				</Button>
			</>
		);
	return props.children;
}

export default function AuthProfile() {
	return (
		<Layout title="Profile" type="single">
			<Auth.UserContextProvider supabaseClient={supabase}>
				<Profile supabaseClient={supabase}>
					<Auth supabaseClient={supabase} />
				</Profile>
			</Auth.UserContextProvider>
		</Layout>
	);
}
