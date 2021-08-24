import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/api";
import Avatar from "react-avatar";

function Header() {
	return (
		<>
			<header className="py-4 mx-auto mb-8 max-w-screen-2xl">
				<div className="flex items-center">
					<div className="w-1/2">
						<input
							type="search"
							placeholder="Search"
							className="p-2 pl-4 bg-white rounded-full"
						/>
					</div>
					<div className="w-1/2 text-right">
						<Avatar
							className="rounded-full"
							name="Tony Sanjaya"
							size="40"
							textSizeRatio={1.75}
						/>
					</div>
				</div>
			</header>
		</>
	);
}
export default Header;
