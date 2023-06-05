import React, { FormEvent, useRef, useState } from "react";
import BlankPNG from "../../assets/blank-profile-picture.png";
import { MdClose, MdOutlineImage, MdPeople, MdPublic } from "react-icons/md";
import ReplyModal from "./ReplyModal";
import { useForm } from "react-hook-form";

type Props = {
	replyModalOpen: boolean;
	setReplyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
	tweet: string;
	image?: FileList;
};

type TweetAccessibility = "everyone" | "people you follow";

function TweetSomething({ replyModalOpen, setReplyModalOpen }: Props) {
	const [replyType, setReplyType] = useState<TweetAccessibility>("everyone");
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const { register, handleSubmit, watch, resetField } = useForm<FormValues>();
	const currentImage = watch("image")?.[0];

	function onTweetSubmit() {}

	function AdjustTextAreaHeight() {
		if (!textAreaRef.current) return;
		textAreaRef.current.style.height = "";
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
	}

	function toggleReplyModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.stopPropagation();
		setReplyModalOpen((prev) => !prev);
	}

	function setToEveryone() {
		setReplyType("everyone");
		setReplyModalOpen(false);
	}

	function setToFollow() {
		setReplyType("people you follow");
		setReplyModalOpen(false);
	}

	return (
		<div className="w-full rounded-xl bg-white px-5 py-2.5 shadow-soft" onClick={() => setReplyModalOpen(false)}>
			<div className="mb-2 border-b border-b-[#e0e0e0] pb-2 font-poppins text-xs font-semibold text-[#4f4f4f]">
				Tweet something
			</div>
			<form className="flex gap-3" onSubmit={handleSubmit(onTweetSubmit)}>
				<div className="h-10 w-10 overflow-hidden rounded-lg">
					<img className="centered-image" src={BlankPNG} alt={"name" + " picture"} />
				</div>
				<div className="flex-1">
					<div>
						<textarea
							className="mt-2.5 h-[50px] w-full resize-none border-none font-medium text-[#4f4f4f] outline-none placeholder:text-[#bdbdbd]"
							{...register("tweet")}
							ref={textAreaRef}
							id="tweet"
							placeholder="What's happening?"
							onInput={AdjustTextAreaHeight}
						/>
					</div>
					{currentImage && (
						<div className="relative mb-5 w-full overflow-hidden rounded-lg">
							<div
								className="absolute right-3 top-3 grid h-7 w-7 cursor-pointer place-items-center rounded-full bg-black text-xl text-white opacity-50"
								onClick={() => resetField("image")}
							>
								<MdClose />
							</div>
							<img className="h-auto w-full" src={URL.createObjectURL(currentImage)} alt="image" />
						</div>
					)}
					<div className="flex items-end gap-[14px] self-stretch text-primaryBlue">
						<label className="flex cursor-pointer items-center" htmlFor="image">
							<MdOutlineImage />
						</label>
						<input className="hidden" type="file" id="image" {...register("image")} />
						<div className="relative flex cursor-pointer items-center gap-2" onClick={toggleReplyModal}>
							{replyType === "everyone" && (
								<>
									<MdPublic />
									<span className="text-xs font-medium">Everyone can reply</span>
								</>
							)}
							{replyType === "people you follow" && (
								<>
									<MdPeople />
									<span className="text-xs font-medium">People you follow</span>
								</>
							)}
							{replyModalOpen && (
								<ReplyModal
									setToEveryone={setToEveryone}
									setToFollow={setToFollow}
									onClick={(e) => e.stopPropagation()}
								/>
							)}
						</div>
						<button className="ml-auto rounded bg-primaryBlue px-6 py-2 text-white" type="submit">
							Tweet
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TweetSomething;
