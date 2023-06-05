import React from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";

type Props = {
	initialTab: string;
	layoutId: string;
	tabs: string[];
};

function SideNavigationTabs({ initialTab, layoutId, tabs }: Props) {
	const [searchParams, setSearchParams] = useSearchParams({ filter: initialTab });
	const activeTab = searchParams.get("filter");

	return (
		<div className="flex basis-auto flex-col gap-3 self-stretch rounded-lg bg-white py-5 font-poppins text-sm font-semibold text-ash shadow-soft lg:basis-[306px] lg:self-start">
			{tabs.map((tab, i) => (
				<div
					key={i}
					className="flex cursor-pointer items-center gap-4"
					onClick={() => setSearchParams({ filter: tab })}
				>
					{activeTab === tab ? (
						<motion.div className="h-8 w-1 self-start rounded-verticalBar bg-primaryBlue" layoutId={layoutId} />
					) : (
						<div className="h-8 w-1 self-start bg-transparent" />
					)}
					<span className="capitalize">{tab}</span>
				</div>
			))}
		</div>
	);
}

export default SideNavigationTabs;
