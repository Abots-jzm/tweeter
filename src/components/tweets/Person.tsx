import React, { useState } from "react";
import BlankPNG from "../../assets/blank-profile-picture.png";
import { MdPersonAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import { Paths } from "../../routes";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useFollow from "../../hooks/tweet/useFollow";
import { authActions } from "../../store/slices/authSlice";

type Props = {
	name: string;
	id: string;
	photo?: string;
	cover?: string;
	followers: string[];
	bio: string;
	truncate?: boolean;
};

function Person({ name, id, photo, cover, followers, bio, truncate }: Props) {
	const userId = useAppSelector((state) => state.auth.uid);
	const dispatch = useAppDispatch();

	const [isFollowing, setIsFollowing] = useState(userId ? followers.includes(userId) : false);
	const [noOfFollowers, setNoOfFollowers] = useState(followers.length);
	const { mutate: follow } = useFollow();

	function onFollowBtnClicked() {
		if (!userId) {
			dispatch(authActions.logout());
			return;
		}

		follow({ action: isFollowing ? "unfollow" : "follow", personToFollowId: id, userId });
		setIsFollowing((prev) => !prev);
		setNoOfFollowers((prev) => (isFollowing ? prev - 1 : prev + 1));
	}

	function truncateTxt(value: string, length: number) {
		return value.length > length ? `${value.substring(0, length)}...` : value;
	}

	return (
		<div className="mb-5 border-b border-b-[#e0e0e0] pb-[22px] last:mb-0 last:border-b-0">
			<div className="flex cursor-pointer gap-4">
				<div className="h-10 w-10 overflow-hidden rounded-lg">
					<img className="image-center" src={photo || BlankPNG} alt={name + " pic"} />
				</div>
				<div>
					<Link to={`${Paths.profile}/${id}`} className="font-poppins  font-semibold text-black">
						{truncate ? truncateTxt(name, isFollowing ? 8 : 10) : name}
					</Link>
					<div className="text-xs text-[#bdbdbd]">
						{noOfFollowers} follower{noOfFollowers === 1 ? "" : "s"}
					</div>
				</div>
				<button
					className={`ml-auto flex items-center gap-1 self-center rounded px-3 py-1 text-white ${
						isFollowing ? "bg-ash" : "bg-primaryBlue"
					}`}
					onClick={onFollowBtnClicked}
				>
					<MdPersonAdd />
					<span className="text-xs font-medium">{isFollowing ? "Unfollow" : "Follow"}</span>
				</button>
			</div>
			<p className="mt-5 font-medium text-ash">{bio}</p>
			{cover && (
				<div className="mt-5 h-[77px] w-full overflow-hidden rounded-lg">
					<img className="image-center" src={cover} alt="cover" />
				</div>
			)}
		</div>
	);
}

export default Person;
