import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Tweet from "../components/tweets/Tweet";
import BlankPNG from "../assets/blank-profile-picture.png";
import { MdPersonAdd } from "react-icons/md";
import { Paths } from "../routes";
import { useAppSelector } from "../store/hooks";
import useGetUserProfile from "../hooks/profile/useGetUserProfile";
import SideNavigationTabs from "../components/nav/SideNavigationTabs";

type Tab = "tweet" | "replies" | "media" | "likes";

function Profile() {
	const [isFollowing, setIsFollowing] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams({ filter: "tweet" });
	const { id } = useParams();

	const { data: userProfile } = useGetUserProfile(id!);
	const userId = useAppSelector((state) => state.auth.uid);
	const isMyProfile = id === userId;

	const activeTab = searchParams.get("filter") as Tab;
	const navigate = useNavigate();

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
									<span className="font-semibold text-darkGrey">2,569</span> Following
								</div>
								<div>
									<span className="font-semibold text-darkGrey">10.8k</span> Followers
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
							className={`mb-5 ml-0 mt-0 self-center whitespace-nowrap rounded px-6 py-2 text-white lg:mb-0 lg:ml-auto lg:mt-5 lg:self-start ${
								isFollowing ? "bg-ash" : "bg-primaryBlue"
							}`}
							onClick={() => setIsFollowing((prev) => !prev)}
						>
							<MdPersonAdd />
							<span className="text-xs font-medium">{isFollowing ? "Unfollow" : "Follow"}</span>
						</button>
					)}
				</div>
			</div>
			<div className="mx-auto flex max-w-[1100px] flex-col gap-6 px-5 py-6 lg:flex-row">
				<SideNavigationTabs initialTab="tweet" layoutId="profileNav" tabs={["tweet", "replies", "media", "likes"]} />
				<div className="flex-1">
					<div className="mb-6 flex flex-col gap-6">
						<Tweet
							image="https://images.immediate.co.uk/production/volatile/sites/30/2022/07/Black-beans-avocado-on-toast-d351aa6.jpg?quality=90&webp=true&fit=700,350"
							replies
						>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum omnis odit cupiditate molestiae ad hic
							consequatur eius quo dolor minus. In deserunt sunt architecto doloremque eius, fugiat recusandae ipsam
							eos.
						</Tweet>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Profile;
