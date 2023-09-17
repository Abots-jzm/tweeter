import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

type Props = {
	responsiveness: "desktop" | "mobile";
	tabs: { display: React.ReactNode; path: string }[];
};

function NavigationTabs({ responsiveness, tabs }: Props) {
	return (
		<nav
			className={classNames("justify-evenly gap-8 self-start font-poppins font-medium text-ash lg:gap-16", {
				"flex text-2xl md:hidden": responsiveness === "mobile",
				"hidden text-sm md:flex": responsiveness !== "mobile",
			})}
		>
			{tabs.map((tab, i) => (
				<NavLink
					className={({ isActive }) =>
						classNames(
							"relative flex h-[68px] flex-col items-center justify-end gap-[18px] no-underline",
							{ "font-semibold text-primaryBlue": isActive },
							{ "text-inherit": !isActive }
						)
					}
					to={tab.path}
					key={i}
				>
					{tab.display}
					{tab.path.startsWith(location.pathname) ? (
						<motion.div
							className="block h-[3px] w-20 self-stretch rounded-horizontalBar bg-primaryBlue"
							layoutId={responsiveness}
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
