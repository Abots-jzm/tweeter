import React from "react";
import { MdPeople, MdPublic } from "react-icons/md";

type Props = {
	onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
	changeIsPublicReply: (isPublicReply: boolean) => void;
};

function ReplyModal({ onClick, changeIsPublicReply }: Props) {
	return (
		<div
			className="absolute left-0 top-[30px] w-[234px] rounded-xl border border-[#e0e0e0] bg-white px-3 py-2.5 text-xs font-medium text-[#4f4f4f] shadow-soft"
			onClick={onClick}
		>
			<div className="font-poppins font-semibold">Who can reply?</div>
			<p className="font-normal text-ash">Choose who can reply to this Tweet.</p>
			<div className="mt-4 w-full">
				<div
					className="flex items-center gap-2 rounded-lg p-3 text-xl hover:bg-offWhite"
					onClick={() => changeIsPublicReply(true)}
				>
					<MdPublic />
					<span className="text-xs">Everyone can reply</span>
				</div>
				<div
					className=" flex items-center gap-2 rounded-lg p-3 text-xl hover:bg-offWhite"
					onClick={() => changeIsPublicReply(false)}
				>
					<MdPeople />
					<span className="text-xs">People you follow</span>
				</div>
			</div>
		</div>
	);
}

export default ReplyModal;
