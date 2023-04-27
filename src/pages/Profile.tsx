import React, { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import Tweet from "../components/tweets/Tweet";
import { motion } from "framer-motion";
import BlankPNG from "../assets/blank-profile-picture.png";
import { MdPersonAdd } from "react-icons/md";
import { Paths } from "../routes";
import { useAppSelector } from "../store/hooks";
import useGetUserProfile from "../hooks/profile/useGetUserProfile";

type Tab = "tweet" | "replies" | "media" | "likes";

function Profile() {
	const [isFollowing, setIsFollowing] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams({ filter: "tweet" });
	const { id } = useParams();
	const { data: userProfile } = useGetUserProfile(id!);

	const userId = useAppSelector((state) => state.auth.uid);
	const activeTab = searchParams.get("filter") as Tab;
	const navigate = useNavigate();

	const isMyProfile = id === userId;

	return (
		<Container>
			<CoverImg>
				{userProfile?.coverURL && <img src={userProfile.coverURL} alt={userProfile.displayName + " cover image"} />}
			</CoverImg>
			<ProfileInfo>
				<div>
					<Picture>
						<div>
							<img src={userProfile?.photoURL || BlankPNG} alt={userProfile?.displayName + " picture"} />
						</div>
					</Picture>
					<Info>
						<div className="top">
							<div className="name bold">{userProfile?.displayName}</div>
							<div className="count">
								<div>
									<span className="bold">2,569</span> Following
								</div>
								<div>
									<span className="bold">10.8k</span> Followers
								</div>
							</div>
						</div>
						<div className="bio">{userProfile?.bio}</div>
					</Info>
					{isMyProfile && (
						<EditProfileBtn onClick={() => navigate(Paths.profileEdit)}>
							<span>Edit Profile</span>
						</EditProfileBtn>
					)}
					{!isMyProfile && (
						<FollowBtn isFollowing={isFollowing} onClick={() => setIsFollowing((prev) => !prev)}>
							<MdPersonAdd />
							<span>{isFollowing ? "Unfollow" : "Follow"}</span>
						</FollowBtn>
					)}
				</div>
			</ProfileInfo>
			<Tweets>
				<Navigation>
					<div onClick={() => setSearchParams({ filter: "tweet" })}>
						{activeTab === "tweet" ? <ActiveBar layoutId="profileNav" /> : <Bar />}
						<span>Tweets</span>
					</div>
					<div onClick={() => setSearchParams({ filter: "replies" })}>
						{activeTab === "replies" ? <ActiveBar layoutId="profileNav" /> : <Bar />}
						<span>Tweets & replies</span>
					</div>
					<div onClick={() => setSearchParams({ filter: "media" })}>
						{activeTab === "media" ? <ActiveBar layoutId="profileNav" /> : <Bar />}
						<span>Media</span>
					</div>
					<div onClick={() => setSearchParams({ filter: "likes" })}>
						{activeTab === "likes" ? <ActiveBar layoutId="profileNav" /> : <Bar />}
						<span>Likes</span>
					</div>
				</Navigation>
				<div className="right">
					<TweetsContainer>
						<Tweet
							image="https://images.immediate.co.uk/production/volatile/sites/30/2022/07/Black-beans-avocado-on-toast-d351aa6.jpg?quality=90&webp=true&fit=700,350"
							replies
						>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum omnis odit cupiditate molestiae ad hic
							consequatur eius quo dolor minus. In deserunt sunt architecto doloremque eius, fugiat recusandae ipsam
							eos.
						</Tweet>
					</TweetsContainer>
				</div>
			</Tweets>
		</Container>
	);
}

export default Profile;

const EditProfileBtn = styled.button`
	align-self: flex-start;
	margin-left: auto;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-top: 2rem;
	color: white;
	background-color: #2f80ed;
	border-radius: 4px;
	padding: 0.8rem 2.4rem;
	white-space: nowrap;

	span {
		font-size: 1.2rem;
		font-weight: 500;
	}

	@media (max-width: 900px) {
		align-self: center;
		margin-left: 0;
		margin-bottom: 2rem;
		margin-top: 0;
	}
`;

interface IFollowBtn {
	isFollowing: boolean;
}

const FollowBtn = styled(EditProfileBtn)<IFollowBtn>`
	background-color: ${(props) => (props.isFollowing ? "#828282" : "#2f80ed")};
`;

const Info = styled.div`
	padding: 2rem 0;
	color: #828282;
	font-weight: 500;

	.top {
		display: flex;
		gap: 2.6rem;
		font-family: "Poppins", sans-serif;
		align-items: center;
		font-size: 1.2rem;
	}

	.count {
		display: flex;
		gap: 2.6rem;
	}

	.bold {
		font-weight: 600;
		color: #333333;
	}

	.name {
		font-size: 2.4rem;
	}

	.bio {
		margin-top: 2.2rem;
		font-size: 1.8rem;
	}

	@media (max-width: 900px) {
		margin-top: 3.4rem;

		.top {
			flex-direction: column;
			gap: 0.4rem;
		}
	}
`;

const Picture = styled.div`
	flex: 0 0 15.2rem;
	height: 15.2rem;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
	border-radius: 8px;
	background-color: white;
	position: relative;
	bottom: 5.2rem;
	padding: 0.4rem;

	div {
		border-radius: 8px;
		overflow: hidden;
		width: 100%;
		height: 100%;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	@media (max-width: 900px) {
		width: 11.6rem;
		height: 11.6rem;
		padding: 0.3rem;
		position: absolute;
		top: -8rem;
	}
`;

const ProfileInfo = styled.div`
	margin: 0 auto;
	max-width: 110rem;
	padding-inline: 2rem;

	& > div {
		background-color: white;
		position: relative;
		z-index: 2;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
		border-radius: 12px;
		display: flex;
		gap: 2.4rem;
		padding: 0.5rem 2.4rem;
	}

	@media (max-width: 900px) {
		& > div {
			flex-direction: column;
			align-items: center;
		}
	}
`;

const TweetsContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2.4rem;
	gap: 2.4rem;
`;

const Bar = styled(motion.div)`
	background-color: transparent;
	align-self: stretch;
	width: 0.3rem;
	height: 3.2rem;
`;

const ActiveBar = styled(Bar)`
	background-color: #2f80ed;
	border-radius: 0px 4px 4px 0px;
`;

const Navigation = styled.div`
	align-self: flex-start;
	flex-basis: 30.6rem;
	padding: 2rem 0;
	color: #828282;
	font-family: "Poppins", sans-serif;
	font-weight: 600;
	font-size: 1.4rem;
	background-color: #ffffff;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
	border-radius: 8px;
	display: flex;
	gap: 1.2rem;
	flex-direction: column;

	& > div {
		display: flex;
		gap: 1.7rem;
		align-items: center;
		cursor: pointer;
	}

	@media only screen and (max-width: 900px) {
		align-self: stretch;
		flex-basis: auto;
	}
`;

const Tweets = styled.div`
	max-width: 110rem;
	margin: 0 auto;
	padding: 2.5rem 2rem;
	display: flex;
	gap: 2.5rem;

	& > .right {
		flex: 1;
	}

	@media only screen and (max-width: 900px) {
		flex-direction: column;
	}
`;

const CoverImg = styled.div`
	position: absolute;
	width: 100%;
	height: 29.7rem;
	overflow: hidden;
	top: 0;
	z-index: 1;
	background-color: #828282;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	@media (max-width: 900px) {
		height: 16.8rem;
	}
`;

const Container = styled.div`
	position: relative;
	padding-top: 24.2rem;

	@media (max-width: 900px) {
		padding-top: 14.9rem;
	}
`;
