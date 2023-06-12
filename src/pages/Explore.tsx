import React from "react";
import Tweet from "../components/tweets/Tweet";
import { useSearchParams } from "react-router-dom";
import Person from "../components/tweets/Person";
import SideNavigationTabs from "../components/nav/SideNavigationTabs";
import useGetTopTweets from "../hooks/tweet/useGetTopTweets";
import { useAppSelector } from "../store/hooks";
import useGetLatestTweets from "../hooks/tweet/useGetLatestTweets";
import useGetMediaTweets from "../hooks/tweet/useGetMediaTweets";
import useGetUserProfile from "../hooks/profile/useGetUserProfile";
import useGetPeople from "../hooks/tweet/useGetPeople";

type Tab = "top" | "latest" | "people" | "media";

function Explore() {
	const [searchParams] = useSearchParams({ filter: "top" });
	const activeTab = searchParams.get("filter") as Tab;
	const userId = useAppSelector((state) => state.auth.uid);
	const { data: userProfile } = useGetUserProfile(userId);

	const { data: topTweets, isLoading: topLoading } = useGetTopTweets(userId, activeTab === "top");
	const { data: latestTweets, isLoading: latestLoading } = useGetLatestTweets(userId, activeTab === "latest");
	const { data: mediaTweets, isLoading: mediaLoading } = useGetMediaTweets(userId, activeTab === "media");
	const { data: peopleData, isLoading: peopleLoading } = useGetPeople(activeTab === "people" && !!userProfile?.userId);

	return (
		<div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-5 py-6 lg:flex-row">
			<SideNavigationTabs initialTab="top" layoutId="exploreNav" tabs={["top", "latest", "people", "media"]} />
			<div className="flex-1">
				{activeTab !== "people" && (
					<div className="mb-6 flex flex-col gap-6">
						{activeTab === "top" && (
							<>
								{topLoading && (
									<div className="grid w-full place-items-center pt-24">
										<div className="spinner h-20 w-20 border-l-primaryBlue" />
									</div>
								)}
								{topTweets?.map((tweet) => (
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
							</>
						)}
						{activeTab === "latest" && (
							<>
								{latestLoading && (
									<div className="grid w-full place-items-center pt-24">
										<div className="spinner h-20 w-20 border-l-primaryBlue" />
									</div>
								)}
								{latestTweets?.map((tweet) => (
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
							</>
						)}
						{activeTab === "media" && (
							<>
								{mediaLoading && (
									<div className="grid w-full place-items-center pt-24">
										<div className="spinner h-20 w-20 border-l-primaryBlue" />
									</div>
								)}
								{mediaTweets?.map((tweet) => (
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
							</>
						)}
					</div>
				)}
				{activeTab === "people" && (
					<>
						{peopleLoading && (
							<div className="grid w-full place-items-center pt-24">
								<div className="spinner h-20 w-20 border-l-primaryBlue" />
							</div>
						)}
						{!peopleLoading && (
							<div className="rounded-xl bg-white p-5 shadow-soft">
								{peopleData?.map((person) => (
									<Person
										key={person.userId}
										id={person.userId}
										name={person.displayName}
										photo={person.photoURL}
										cover={person.coverURL}
										followers={person.followers}
										bio={person.bio}
									/>
								))}
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default Explore;
