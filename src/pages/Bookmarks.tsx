import React from "react";
import Tweet from "../components/tweets/Tweet";
import useGetBookmarks from "../hooks/tweet/useGetBookmarks";
import { useAppSelector } from "../store/hooks";

function Bookmarks() {
	const userId = useAppSelector((state) => state.auth.uid);
	const { data: bookmarks, isLoading: bookmarksLoading } = useGetBookmarks(userId);

	return (
		<div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-5 py-6 lg:flex-row">
			<div className="flex-1">
				<div className="mb-6 flex flex-col gap-6">
					{bookmarksLoading && (
						<div className="grid w-full place-items-center pt-24">
							<div className="spinner h-20 w-20 border-l-primaryBlue" />
						</div>
					)}
					{!bookmarksLoading && bookmarks?.length === 0 && !bookmarksLoading && (
						<div className="mx-auto pt-20">You don't have any Bookmarks</div>
					)}
					{!bookmarksLoading &&
						bookmarks?.map((tweet) => (
							<Tweet
								key={tweet.id}
								id={tweet.id}
								image={tweet.imageUrl}
								displayName={tweet.displayName}
								time={tweet.time}
								photo={tweet.photoUrl}
								likes={tweet.likes}
								bookmarks={tweet.bookmarks}
								retweets={tweet.retweets}
								replies={tweet.replies}
								userTweetId={tweet.uid}
							>
								{tweet.content}
							</Tweet>
						))}
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
