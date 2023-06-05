import React, { useState } from "react";
import BlankPNG from "../../assets/blank-profile-picture.png";
import { MdPersonAdd } from "react-icons/md";

type Props = {
	truncate?: boolean;
};

function Person({ truncate }: Props) {
	const [isFollowing, setIsFollowing] = useState(false);

	function truncateTxt(value: string, length: number) {
		return value.length > length ? `${value.substring(0, length)}...` : value;
	}

	return (
		<div className="mb-5 border-b border-b-[#e0e0e0] pb-[22px] last:mb-0 last:border-b-0">
			<div className="flex cursor-pointer gap-4">
				<div className="h-10 w-10 overflow-hidden rounded-lg">
					<img className="image-center" src={BlankPNG} alt={"name" + ""} />
				</div>
				<div>
					<div className="font-poppins  font-semibold text-black">
						{truncate ? truncateTxt("Micheal Stanley", isFollowing ? 8 : 10) : "Micheal Stanley"}
					</div>
					<div className="text-xs text-[#bdbdbd]">230k followers</div>
				</div>
				<button
					className={`ml-auto flex items-center gap-1 self-center rounded px-3 py-1 text-white ${
						isFollowing ? "bg-ash" : "bg-primaryBlue"
					}`}
					onClick={() => setIsFollowing((prev) => !prev)}
				>
					<MdPersonAdd />
					<span className="text-xs font-medium">{isFollowing ? "Unfollow" : "Follow"}</span>
				</button>
			</div>
			<p className="mt-5 font-medium text-ash">Photographer and Filmaker based in Copenhagen, Denmark</p>
			<div className="mt-5 h-[77px] w-full overflow-hidden rounded-lg">
				<img
					className="image-center"
					src="https://images.immediate.co.uk/production/volatile/sites/30/2022/07/Black-beans-avocado-on-toast-d351aa6.jpg?quality=90&webp=true&fit=700,350"
					alt="bio"
				/>
			</div>
		</div>
	);
}

export default Person;
