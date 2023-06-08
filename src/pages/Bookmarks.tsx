import React from "react";
import Tweet from "../components/tweets/Tweet";
import SideNavigationTabs from "../components/nav/SideNavigationTabs";

function Bookmarks() {
	return (
		<div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-5 py-6 lg:flex-row">
			<SideNavigationTabs layoutId="bookmarksNav" initialTab="tweet" tabs={["tweet", "replies", "media", "likes"]} />
			<div className="flex-1">
				<div className="mb-6 flex flex-col gap-6">
					{/* <Tweet
						image="https://images.immediate.co.uk/production/volatile/sites/30/2022/07/Black-beans-avocado-on-toast-d351aa6.jpg?quality=90&webp=true&fit=700,350"
						replies
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum omnis odit cupiditate molestiae ad hic
						consequatur eius quo dolor minus. In deserunt sunt architecto doloremque eius, fugiat recusandae ipsam eos.
					</Tweet> */}
				</div>
			</div>
		</div>
	);
}

export default Bookmarks;
