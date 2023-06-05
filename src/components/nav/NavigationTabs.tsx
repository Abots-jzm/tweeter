import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

type Props = {
	responsiveness: "desktop" | "mobile";
	tabs: { display: React.ReactNode; path: string }[];
};

function NavigationTabs({ responsiveness, tabs }: Props) {
	return (
		<nav
			className={`justify-evenly gap-8 self-stretch font-poppins font-medium text-ash lg:gap-16 ${
				responsiveness === "mobile" ? "flex text-2xl md:hidden" : "hidden text-sm md:flex"
			}`}
		>
			{tabs.map((tab, i) => (
				<NavLink
					className={({ isActive }) =>
						`relative flex h-[68px] flex-col items-center justify-end gap-[18px] no-underline ${
							isActive ? "font-semibold text-primaryBlue" : "text-inherit"
						}`
					}
					to={tab.path}
					key={i}
				>
					{tab.display}
					{tab.path.startsWith(location.pathname) ? (
						<motion.div
							className="block h-[3px] w-20 self-stretch rounded-horizontalBar bg-primaryBlue"
							layoutId={`${responsiveness === "mobile" ? "m" : ""}active`}
						/>
					) : (
						<div className="h-[3px] w-20 self-stretch bg-transparent" />
					)}
				</NavLink>
			))}
		</nav>
	);
}

export default NavigationTabs;
