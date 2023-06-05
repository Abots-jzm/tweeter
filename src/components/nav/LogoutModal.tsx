import React from "react";
import { UseMutateFunction } from "@tanstack/react-query";
import { HiUserCircle } from "react-icons/hi";
import { TbLogout } from "react-icons/tb";

type Props = {
	logout: UseMutateFunction;
	onProfileClicked: () => void;
};

function LogoutModal({ logout, onProfileClicked }: Props) {
	return (
		<div
			className="absolute right-0 top-10 z-[5] flex w-[192px] cursor-default flex-col gap-6 rounded-xl border border-[#e0e0e0] bg-white p-[13px] font-medium shadow-soft "
			onClick={(e) => e.stopPropagation()}
		>
			<div
				className="relative cursor-pointer rounded-lg p-[11px] pl-[41px] text-[#4f4f4f] hover:bg-offWhite"
				onClick={onProfileClicked}
			>
				<p className="absolute left-[11px] top-[9px] grid place-items-center text-xl">
					<HiUserCircle />
				</p>
				My Profile
			</div>
			<p className="absolute top-16 h-px w-[164px] bg-[#e0e0e0]" />
			<div
				className="relative cursor-pointer rounded-lg p-[11px] pl-[41px] text-[#eb5757] hover:bg-offWhite"
				onClick={() => logout()}
			>
				<p className="absolute left-[11px] top-[9px] grid place-items-center text-xl">
					<TbLogout />
				</p>
				Logout
			</div>
		</div>
	);
}

export default LogoutModal;
