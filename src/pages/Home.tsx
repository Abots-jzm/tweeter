import React, { useState } from "react";
import TweetSomething from "../components/tweets/TweetSomething";
import Tweet from "../components/tweets/Tweet";
import Person from "../components/tweets/Person";
import useGetHomeTweets from "../hooks/tweet/useGetHomeTweets";
import { useAppSelector } from "../store/hooks";
import useGetUserProfile from "../hooks/profile/useGetUserProfile";
import { Tweet as TweetType } from "../hooks/tweet/types";
import useGetPeople from "../hooks/tweet/useGetPeople";
import useScreenSize from "../hooks/util/useScreenSize";

function Home() {
	const [replyModalOpen, setReplyModalOpen] = useState(false);
	const { screenWidth } = useScreenSize();
	const userId = useAppSelector((state) => state.auth.uid);

	const { data: userProfile } = useGetUserProfile(userId);
	const { data: homeTweets, isLoading } = useGetHomeTweets(userId, userProfile?.following);
	const { data: peopleData, isLoading: peopleLoading } = useGetPeople(
		true,
		userProfile?.userId,
		screenWidth > 1024 ? 3 : 2
	);

	function getRetweetedName(tweet: TweetType) {
		return tweet.retweets.find((retweet) => userProfile?.following.find((followingId) => followingId == retweet.uid))
			?.name;
	}

	if (isLoading || peopleLoading)
		return (
			<div className="mt-32 grid place-items-center">
				<div className="spinner h-40 w-40 border-l-primaryBlue" />
			</div>
		);

	return (
		<div className="mx-auto my-0 flex max-w-[1100px] gap-6 px-5 py-6">
			<div className="flex-1">
				<TweetSomething replyModalOpen={replyModalOpen} setReplyModalOpen={setReplyModalOpen} />
				<div className="my-6 flex flex-col gap-6">
					{homeTweets?.map((tweet) => (
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
							retweeted={getRetweetedName(tweet)}
						>
							{tweet.content}
						</Tweet>
					))}
				</div>
				{peopleData && peopleData.length > 0 && (
					<div className="mt-6 block w-full self-start rounded-xl bg-white px-2.5 py-5 shadow-soft lg:hidden">
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
			</div>
			{peopleData && peopleData.length > 0 && (
				<div className="hidden basis-[306px] self-start rounded-xl bg-white px-5 py-3.5 shadow-soft lg:block">
					<p className="mb-5 border-b border-b-[#e0e0e0] pb-2 font-poppins text-xs font-semibold text-[#4f4f4f]">
						Who to follow
					</p>
					<div className="flex flex-col">
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
				</div>
			)}
		</div>
	);
}

export default Home;
