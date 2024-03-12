import React, { useRef, useState } from "react";
import BlankPNG from "../../assets/blank-profile-picture.png";
import { MdClose, MdOutlineImage, MdPeople, MdPublic } from "react-icons/md";
import ReplyModal from "./ReplyModal";
import { useForm } from "react-hook-form";
import useGetUserProfile from "../../hooks/profile/useGetUserProfile";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useTweet from "../../hooks/tweet/useTweet";
import { authActions } from "../../store/slices/authSlice";
import { Timestamp } from "firebase/firestore";

const TWEET_CHARACTER_LIMIT = 280;

type Props = {
	replyModalOpen: boolean;
	setReplyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormValues = {
	content: string;
	image?: FileList;
};

function TweetSomething({ replyModalOpen, setReplyModalOpen }: Props) {
	const [isPublicReply, setIsPublicReply] = useState(true);
	const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

	const { register, handleSubmit, watch, resetField, reset } = useForm<FormValues>();
	const { ref, ...rest } = register("content", { maxLength: TWEET_CHARACTER_LIMIT });
	const currentImage = watch("image")?.[0];

	const uid = useAppSelector((state) => state.auth.uid);
	const dispatch = useAppDispatch();

	const { data: userProfile } = useGetUserProfile(uid);
	const { mutate: tweet, isLoading: isTweeting } = useTweet();

	function onTweetSubmit({ content, image }: FormValues) {
		if (!uid) {
			dispatch(authActions.logout());
			return;
		}

		if (!userProfile) return;

		content = content.replace(/(\n{3,})/g, "\n\n");

		tweet(
			{
				uid,
				content,
				isPublicReply,
				time: Timestamp.now(),
				user: userProfile,
				image: image?.[0],
			},
			{
				onSuccess() {
					reset();
				},
			}
		);
	}

	function AdjustTextAreaHeight() {
		if (!textAreaRef.current) return;
		textAreaRef.current.style.height = "";
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
	}

	function toggleReplyModal(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		e.stopPropagation();
		setReplyModalOpen((prev) => !prev);
	}

	function changeIsPublicReply(isPublicReply: boolean) {
		setIsPublicReply(isPublicReply);
		setReplyModalOpen(false);
	}

	return (
		<div className="w-full rounded-xl bg-white px-5 py-2.5 shadow-soft" onClick={() => setReplyModalOpen(false)}>
			<div className="mb-2 border-b border-b-[#e0e0e0] pb-2 font-poppins text-xs font-semibold text-[#4f4f4f]">
				Tweet something
			</div>
			<form className="flex gap-3" onSubmit={handleSubmit(onTweetSubmit)}>
				<div className="h-10 w-10 overflow-hidden rounded-lg">
					<img
						className="image-center"
						src={userProfile?.photoURL || BlankPNG}
						alt={userProfile?.displayName + " picture"}
					/>
				</div>
				<div className="flex-1">
					<div>
						<textarea
							className="mt-2.5 h-[50px] w-full resize-none border-none font-medium text-[#4f4f4f] outline-none placeholder:text-[#bdbdbd]"
							{...rest}
							ref={(e) => {
								ref(e);
								textAreaRef.current = e;
							}}
							id="content"
							placeholder="What's happening?"
							onInput={AdjustTextAreaHeight}
							required
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
						<input className="hidden" type="file" id="image" {...register("image")} accept="image/*" />
						<div className="relative flex cursor-pointer items-center gap-2" onClick={toggleReplyModal}>
							{isPublicReply && (
								<>
									<MdPublic />
									<span className="text-xs font-medium">Everyone</span>
								</>
							)}
							{!isPublicReply && (
								<>
									<MdPeople />
									<span className="text-xs font-medium">Following</span>
								</>
							)}
							{replyModalOpen && (
								<ReplyModal onClick={(e) => e.stopPropagation()} changeIsPublicReply={changeIsPublicReply} />
							)}
						</div>
						{watch("content") && (
							<div className="text-xs text-ash">
								{watch("content").length}/{TWEET_CHARACTER_LIMIT}
							</div>
						)}
						<button className="ml-auto flex gap-2 rounded bg-primaryBlue px-6 py-2 text-white" type="submit">
							Tweet
							{isTweeting && <div className="spinner" />}
						</button>
					</div>
				</div>
			</form>
		</div>
	);
}

export default TweetSomething;
