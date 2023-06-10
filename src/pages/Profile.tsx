import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Tweet from "../components/tweets/Tweet";
import BlankPNG from "../assets/blank-profile-picture.png";
import { MdPersonAdd } from "react-icons/md";
import { Paths } from "../routes";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import useGetUserProfile from "../hooks/profile/useGetUserProfile";
import SideNavigationTabs from "../components/nav/SideNavigationTabs";
import useGetAllUserTweets from "../hooks/tweet/useGetAllUserTweets";
import { authActions } from "../store/slices/authSlice";
import useFollow from "../hooks/tweet/useFollow";
import useGetAllUserMedia from "../hooks/tweet/useGetAllUserMedia";
import useGetAllUserLikes from "../hooks/tweet/useGetAllUserLikes";

type Tab = "tweet" | "media" | "likes";

function Profile() {
	const { id } = useParams();
	const [searchParams] = useSearchParams({ filter: "tweet" });
	const activeTab = searchParams.get("filter") as Tab;

	const userId = useAppSelector((state) => state.auth.uid);
	const dispatch = useAppDispatch();
	const isMyProfile = id === userId;
	const navigate = useNavigate();

	const { mutate: follow } = useFollow();
	const { data: userProfile, isLoading: profileLoading } = useGetUserProfile(id!);
	const { data: allTweets, isLoading: allTweetsLoading } = useGetAllUserTweets(activeTab === "tweet", id);
	const { data: allMedia, isLoading: allMediaLoading } = useGetAllUserMedia(activeTab === "media", id);
	const { data: allLikes, isLoading: allLikesLoading } = useGetAllUserLikes(activeTab === "likes", id);

	const [isFollowing, setIsFollowing] = useState(userId ? userProfile?.followers.includes(userId) : false);
	const [noOfFollowers, setNoOfFollowers] = useState(userProfile?.followers.length || 0);

	useEffect(() => {
		if (!userProfile) return;
		setNoOfFollowers(userProfile.followers.length);
		setIsFollowing(userId ? userProfile?.followers.includes(userId) : false);
	}, [userProfile]);

	function onFollowBtnClicked() {
		if (!userId) {
			dispatch(authActions.logout());
			return;
		}

		follow({ action: isFollowing ? "unfollow" : "follow", personToFollowId: id!, userId });
		setIsFollowing((prev) => !prev);
		setNoOfFollowers((prev) => (isFollowing ? prev - 1 : prev + 1));
	}

	if (profileLoading)
		return (
			<div className="mt-32 grid place-items-center">
				<div className="spinner h-40 w-40 border-l-primaryBlue" />
			</div>
		);

	return (
		<div className="relative pt-[149px] lg:pt-[242px]">
			<div className="absolute top-0 z-[1] h-[168px] w-full overflow-hidden bg-ash lg:h-[297px]">
				{userProfile?.coverURL && (
					<img className="image-center" src={userProfile.coverURL} alt={userProfile.displayName + " cover image"} />
				)}
			</div>
			<div className="mx-auto max-w-[1100px] px-5">
				<div className="relative z-[2] flex flex-col items-center gap-6 rounded-xl bg-white px-6 py-1 shadow-soft lg:flex-row lg:items-stretch">
					<div className="absolute -top-20 bottom-[52px] h-[116px] w-[116px] flex-shrink-0 flex-grow-0 basis-[152px] rounded-lg bg-white p-1 shadow-soft lg:relative lg:-top-10 lg:h-[152px]">
						<div className="h-full w-full overflow-hidden rounded-lg">
							<img
								className="image-center"
								src={userProfile?.photoURL || BlankPNG}
								alt={userProfile?.displayName + " picture"}
							/>
						</div>
					</div>
					<div className="mt-[34px] py-5 font-medium lg:mt-0">
						<div className="flex flex-col items-center gap-1 font-poppins text-xs lg:flex-row lg:gap-[26px]">
							<div className="text-2xl font-semibold text-darkGrey">{userProfile?.displayName}</div>
							<div className="flex gap-[26px]">
								<div>
									<span className="font-semibold text-darkGrey">{userProfile?.following.length}</span> Following
								</div>
								<div>
									<span className="font-semibold text-darkGrey">{noOfFollowers}</span> Follower
									{noOfFollowers === 1 ? "" : "s"}
								</div>
							</div>
						</div>
						<div className="mt-[22px] text-lg">{userProfile?.bio}</div>
					</div>
					{isMyProfile && (
						<button
							className="mb-5 ml-0 mt-0 self-center whitespace-nowrap rounded bg-primaryBlue px-6 py-2 text-white lg:mb-0 lg:ml-auto lg:mt-5 lg:self-start"
							onClick={() => navigate(Paths.profileEdit)}
						>
							<span className="text-xs font-medium">Edit Profile</span>
						</button>
					)}
					{!isMyProfile && (
						<button
							className={`mb-5 ml-0 mt-0 flex gap-2 self-center whitespace-nowrap rounded px-6 py-2 text-white lg:mb-0 lg:ml-auto lg:mt-5 lg:self-start ${
								isFollowing ? "bg-ash" : "bg-primaryBlue"
							}`}
							onClick={onFollowBtnClicked}
						>
							<MdPersonAdd />
							<span className="text-xs font-medium">{isFollowing ? "Unfollow" : "Follow"}</span>
						</button>
					)}
				</div>
			</div>
			<div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-5 py-6 lg:flex-row">
				<SideNavigationTabs initialTab="tweet" layoutId="profileNav" tabs={["tweet", "media", "likes"]} />
				<div className="flex-1">
					<div className="mb-6 flex flex-col gap-6">
						{activeTab === "tweet" && (
							<>
								{allTweetsLoading && (
									<div className="grid w-full place-items-center pt-24">
										<div className="spinner h-20 w-20 border-l-primaryBlue" />
									</div>
								)}
								{!allTweetsLoading && allTweets?.length === 0 && !allTweetsLoading && (
									<div className="mx-auto pt-20">You haven't tweeted anything yet</div>
								)}
								{!allTweetsLoading &&
									allTweets?.map((tweet) => (
										<Tweet
											key={tweet.id}
											id={tweet.id}
											image={tweet.imageUrl}
											displayName={tweet.displayName}
											time={tweet.time}
											photo={tweet.photoUrl}
											likes={tweet.likes}
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
								{allMediaLoading && (
									<div className="grid w-full place-items-center pt-24">
										<div className="spinner h-20 w-20 border-l-primaryBlue" />
									</div>
								)}
								{!allMediaLoading && allMedia?.length === 0 && !allMediaLoading && (
									<div className="mx-auto pt-20">You haven't tweeted any media yet</div>
								)}
								{!allMediaLoading &&
									allMedia?.map((tweet) => (
										<Tweet
											key={tweet.id}
											id={tweet.id}
											image={tweet.imageUrl}
											displayName={tweet.displayName}
											time={tweet.time}
											photo={tweet.photoUrl}
											likes={tweet.likes}
											retweets={tweet.retweets}
											replies={tweet.replies}
											userTweetId={tweet.uid}
										>
											{tweet.content}
										</Tweet>
									))}
							</>
						)}
						{activeTab === "likes" && (
							<>
								{allLikesLoading && (
									<div className="grid w-full place-items-center pt-24">
										<div className="spinner h-20 w-20 border-l-primaryBlue" />
									</div>
								)}
								{!allLikesLoading && allLikes?.length === 0 && !allLikesLoading && (
									<div className="mx-auto pt-20">You haven't liked any tweet yet</div>
								)}
								{!allLikesLoading &&
									allLikes?.map((tweet) => (
										<Tweet
											key={tweet.id}
											id={tweet.id}
											image={tweet.imageUrl}
											displayName={tweet.displayName}
											time={tweet.time}
											photo={tweet.photoUrl}
											likes={tweet.likes}
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
				</div>
			</div>
		</div>
	);
}

export default Profile;
