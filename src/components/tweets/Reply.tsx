import React from "react";
import BlankPNG from "../../assets/blank-profile-picture.png";
import { MdFavoriteBorder } from "react-icons/md";

type Props = {
	children: React.ReactNode;
};

function Reply({ children }: Props) {
	return (
		<div className="flex gap-2.5">
			<div className="w10 h-10 flex-shrink-0 overflow-hidden rounded-lg">
				<img className="image-center" src={BlankPNG} alt={"name" + ""} />
			</div>
			<div className="rounded-lg bg-[#fafafa] px-3.5 py-2">
				<div className="flex items-baseline gap-3.5">
					<div className="font-poppins, font-medium text-black">Micheal Stanley</div>
					<div className="text-xs text-[#bdbdbd]">24 August at 20:30</div>
				</div>
				<p className="mt-2">{children}</p>
				<div className="mt-6 flex items-center gap-2 text-xs font-medium text-[#bdbdbd]">
					<div className="flex cursor-pointer items-center gap-1">
						<MdFavoriteBorder />
						<span>Like</span>
					</div>
					<div>&middot;</div>
					<div>24k likes</div>
				</div>
			</div>
		</div>
	);
}

export default Reply;
