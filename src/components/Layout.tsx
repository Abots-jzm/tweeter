import React, { useState } from "react";
import Div100vh from "react-div-100vh";
import styled from "styled-components";
import LogoSVG from "../assets/tweeter.svg";
import BlankPNG from "../assets/blank-profile-picture.png";
import { AiOutlineCaretDown } from "react-icons/ai";
import { HiUserCircle } from "react-icons/hi";
import { MdHome, MdExplore, MdBookmark } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../routes";
import useLogout from "../hooks/auth/useLogout";
import { motion } from "framer-motion";
import { useAppSelector } from "../store/hooks";
import useGetUserProfile from "../hooks/profile/useGetUserProfile";

type Props = {
	children: React.ReactNode;
};

function Layout({ children }: Props) {
	const { mutate: logout } = useLogout();
	const [logoutModalOpen, setLogoutModalOpen] = useState(false);
	const navigate = useNavigate();
	const userId = useAppSelector((state) => state.auth.uid);
	const { data: userProfile, isLoading: profileLoading } = useGetUserProfile(userId);

	function toggleLogoutModal(e: React.MouseEvent<HTMLDivElement>) {
		e.stopPropagation();
		setLogoutModalOpen((prev) => !prev);
	}

	function onProfileClicked() {
		setLogoutModalOpen(false);
		navigate(`${Paths.profile}/${userId}?filter=tweet`);
	}

	return (
		<Container onClick={() => setLogoutModalOpen(false)}>
			<Header>
				<div>
					<img src={LogoSVG} alt="logo" />
				</div>
				<Tabs>
					<Tab onClick={() => navigate(Paths.home)} isActive={location.pathname === Paths.home}>
						Home
						{location.pathname === Paths.home ? <ActiveBar layoutId="active" /> : <Bar />}
					</Tab>
					<Tab onClick={() => navigate(Paths.explore + "?filter=top")} isActive={location.pathname === Paths.explore}>
						Explore
						{location.pathname === Paths.explore ? <ActiveBar layoutId="active" /> : <Bar />}
					</Tab>
					<Tab
						onClick={() => navigate(Paths.bookmarks + "?filter=tweet")}
						isActive={location.pathname === Paths.bookmarks}
					>
						Bookmarks
						{location.pathname === Paths.bookmarks ? <ActiveBar layoutId="active" /> : <Bar />}
					</Tab>
				</Tabs>
				{(userProfile || profileLoading) && (
					<Profile onClick={toggleLogoutModal}>
						<div className="photo">
							<img src={userProfile?.photoURL || BlankPNG} alt={userProfile?.displayName + " pic"} />
						</div>
						<div className="name">{userProfile?.displayName}</div>
						<Icon>
							<AiOutlineCaretDown />
							<LogoutModal isOpen={logoutModalOpen} onClick={(e) => e.stopPropagation()}>
								<div className="profile" onClick={onProfileClicked}>
									<p>
										<HiUserCircle />
									</p>
									My Profile
								</div>
								<p className="line" />
								<div className="logout" onClick={() => logout()}>
									<p>
										<TbLogout />
									</p>
									Logout
								</div>
							</LogoutModal>
						</Icon>
					</Profile>
				)}
				{!userProfile && !profileLoading && <CompleteProfile to={Paths.profileSetup}>complete profile</CompleteProfile>}
			</Header>
			<Outlet>{children}</Outlet>
			<MobileNav>
				<MobileTabs>
					<Tab onClick={() => navigate(Paths.home)} isActive={location.pathname === Paths.home}>
						<MdHome />
						{location.pathname === Paths.home ? <ActiveBar layoutId="mActive" /> : <Bar />}
					</Tab>
					<Tab onClick={() => navigate(Paths.explore + "?filter=top")} isActive={location.pathname === Paths.explore}>
						<MdExplore />
						{location.pathname === Paths.explore ? <ActiveBar layoutId="mActive" /> : <Bar />}
					</Tab>
					<Tab
						onClick={() => navigate(Paths.bookmarks + "?filter=tweet")}
						isActive={location.pathname === Paths.bookmarks}
					>
						<MdBookmark />
						{location.pathname === Paths.bookmarks ? <ActiveBar layoutId="mActive" /> : <Bar />}
					</Tab>
				</MobileTabs>
			</MobileNav>
		</Container>
	);
}

export default Layout;

const CompleteProfile = styled(Link)`
	border: 1px solid #828282;
	padding: 0.8rem 1.4rem;
	border-radius: 8px;
	font-weight: 400;
	text-decoration: none;
	color: #828282;
	font-size: 1.2rem;
`;

const MobileNav = styled.nav`
	display: none;

	@media only screen and (max-width: 768px) {
		display: block;
	}
`;

const Bar = styled(motion.div)`
	background-color: transparent;
	align-self: stretch;
	width: 8rem;
	height: 0.3rem;
`;

const ActiveBar = styled(Bar)`
	background-color: #2f80ed;
	border-radius: 8px 8px 0px 0px;
`;

interface ITab {
	isActive: boolean;
}

const Tab = styled.div<ITab>`
	height: 6.8rem;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: center;
	gap: 1.8rem;
	cursor: pointer;
	position: relative;
	color: ${(props) => (props.isActive ? "#2f80ed" : "inherit")};
	font-weight: ${(props) => (props.isActive ? "600" : "inherit")};
`;

const Tabs = styled.nav`
	display: flex;
	justify-content: center;
	gap: 6.4rem;
	color: #828282;
	font-size: 1.4rem;
	font-family: "Poppins", sans-serif;
	font-weight: 500;
	align-self: stretch;

	@media only screen and (max-width: 900px) {
		gap: 3.2rem;
	}

	@media only screen and (max-width: 768px) {
		display: none;
	}
`;

const MobileTabs = styled(Tabs)`
	justify-content: space-evenly;
	font-size: 2.4rem;

	@media only screen and (max-width: 768px) {
		display: flex;
	}
`;

interface ILogoutModal {
	isOpen: boolean;
}

const LogoutModal = styled.div<ILogoutModal>`
	display: ${(props) => (props.isOpen ? "flex" : "none")};
	position: absolute;
	top: 4rem;
	right: 0;
	width: 19.2rem;
	padding: 1.3rem;
	background-color: white;
	border: 1px solid #e0e0e0;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
	border-radius: 12px;
	font-size: 1.2rem;
	font-weight: 500;
	flex-direction: column;
	gap: 2.4rem;
	z-index: 5;
	cursor: default;

	& > div {
		padding: 1.1rem;
		border-radius: 8px;
		padding-left: 4.1rem;
		position: relative;
		cursor: pointer;

		p {
			position: absolute;
			left: 1.1rem;
			font-size: 2rem;
			display: grid;
			place-items: center;
			top: 0.9rem;
		}

		&:hover {
			background-color: #f2f2f2;
		}
	}

	.line {
		background-color: #e0e0e0;
		width: 16.4rem;
		height: 1px;
		position: absolute;
		top: 6.4rem;
	}

	.profile {
		color: #4f4f4f;
	}

	.logout {
		color: #eb5757;
	}
`;

const Icon = styled.div`
	display: grid;
	place-items: center;
	color: #333333;
	font-size: 1.2rem;
	position: relative;
`;

const Profile = styled.div`
	display: flex;
	gap: 1.1rem;
	align-items: center;
	cursor: pointer;

	.photo {
		overflow: hidden;
		height: 3.6rem;
		width: 3.6rem;
		border-radius: 8px;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			object-position: center;
		}
	}

	.name {
		color: #333333;
		font-size: 1.2rem;
		font-weight: 700;
	}
`;

const Outlet = styled.div`
	flex: 1;
	background-color: #f2f2f2;
	overflow-y: auto;
`;

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 5vw;

	@media only screen and (max-width: 768px) {
		padding: 1.6rem 5vw;
	}
`;

const Container = styled(Div100vh)`
	display: flex;
	flex-direction: column;
`;
