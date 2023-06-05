import React, { useState } from "react";
import Div100vh from "react-div-100vh";
import LogoSVG from "../assets/tweeter.svg";
import BlankPNG from "../assets/blank-profile-picture.png";
import { AiOutlineCaretDown } from "react-icons/ai";
import { MdHome, MdExplore, MdBookmark } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Paths } from "../routes";
import useLogout from "../hooks/auth/useLogout";
import { useAppSelector } from "../store/hooks";
import useGetUserProfile from "../hooks/profile/useGetUserProfile";
import LogoutModal from "./nav/LogoutModal";
import MobileNav from "./nav/NavigationTabs";
import NavigationTabs from "./nav/NavigationTabs";

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
		<Div100vh className="flex flex-col" onClick={() => setLogoutModalOpen(false)}>
			<header className="flex items-center justify-between px-[5vw] py-4 md:py-0">
				<div>
					<img src={LogoSVG} alt="logo" />
				</div>
				<NavigationTabs
					responsiveness="desktop"
					tabs={[
						{ display: "Home", path: Paths.home },
						{ display: "Explore", path: Paths.explore + "?filter=top" },
						{ display: "Bookmarks", path: Paths.bookmarks + "?filter=tweet" },
					]}
				/>
				{(userProfile || profileLoading) && (
					<div className="flex cursor-pointer items-center gap-[11px]" onClick={toggleLogoutModal}>
						<div className="h-9 w-9 overflow-hidden rounded-lg">
							<img
								className="image-center"
								src={userProfile?.photoURL || BlankPNG}
								alt={userProfile?.displayName + " pic"}
							/>
						</div>
						<div className="text-xs font-bold text-darkGrey">{userProfile?.displayName}</div>
						<div className="relative grid place-items-center text-xs text-darkGrey">
							<AiOutlineCaretDown />
							{logoutModalOpen && <LogoutModal onProfileClicked={onProfileClicked} logout={logout} />}
						</div>
					</div>
				)}
				{!userProfile && !profileLoading && (
					<Link
						className="rounded-lg border border-ash px-[14px] py-2 text-xs font-normal text-ash no-underline"
						to={Paths.profileSetup}
					>
						complete profile
					</Link>
				)}
			</header>
			<div className="flex-1 overflow-y-auto bg-offWhite">{children}</div>
			<MobileNav
				responsiveness="mobile"
				tabs={[
					{ display: <MdHome />, path: Paths.home },
					{ display: <MdExplore />, path: Paths.explore + "?filter=top" },
					{ display: <MdBookmark />, path: Paths.bookmarks + "?filter=tweet" },
				]}
			/>
		</Div100vh>
	);
}

export default Layout;
