import React from "react";
import BlankPNG from "../../assets/blank-profile-picture.png";

type Props = {
	children: React.ReactNode;
	photo?: string;
	name: string;
	time: string;
};

function Reply({ children, photo, name, time }: Props) {
	return (
		<div className="flex gap-2.5">
			<div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-lg">
				<img className="image-center" src={photo || BlankPNG} alt={name + " photo"} />
			</div>
			<div className="rounded-lg bg-[#fafafa] px-3.5 py-2">
				<div className="flex items-baseline gap-3.5">
					<div className="font-poppins, font-medium text-black">{name}</div>
					<div className="text-xs text-[#bdbdbd]">{time}</div>
				</div>
				<p className="mt-2">{children}</p>
			</div>
		</div>
	);
}

export default Reply;
