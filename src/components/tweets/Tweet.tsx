import React, { useState } from "react";
import { MdBookmarkBorder, MdFavoriteBorder, MdLoop, MdOutlineImage } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import BlankPNG from "../../assets/blank-profile-picture.png";
import Reply from "./Reply";

type Props = {
	children: React.ReactNode;
	retweeted?: string;
	image?: string;
	replies?: boolean;
};

function Tweet({ children, retweeted, image, replies }: Props) {
	const [enteredReply, setEnteredReply] = useState("");
	const [showReplyBox, setShowReplyBox] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [isRetweeted, setIsRetweeted] = useState(false);
	const [isLiked, setIsLiked] = useState(false);
	const [isSaved, setIsSaved] = useState(false);

	function onReplySubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		console.log(enteredReply);
	}

	return (
		<div>
			{retweeted && (
				<div className="mb-2.5 flex items-center gap-2.5 text-sm text-ash">
					<MdLoop />
					<span>{retweeted} Retweeted</span>
				</div>
			)}
			<div className="rounded-lg bg-white p-5 shadow-soft">
				<div
					className={`${replies ? "cursor-pointer" : "cursor-default"}`}
					onClick={() => setShowComments((prev) => !prev)}
				>
					<div className="flex cursor-pointer gap-4">
						<div className="h-10 w-10 overflow-hidden rounded-lg">
							<img className="image-center" src={BlankPNG} alt={"name" + ""} />
						</div>
						<div>
							<div className="font-poppins font-medium text-black">Micheal Stanley</div>
							<div className="text-xs text-[#bdbdbd]">24 August at 20:30</div>
						</div>
					</div>
					<div className="mt-5">{children}</div>
					{image && (
						<div className="mt-5 h-[350px] w-full overflow-hidden rounded-lg">
							<img className="image-center" src={image} alt="image" />
						</div>
					)}
					<div className="mt-3.5 flex justify-end gap-4 text-xs font-medium text-[#bdbdbd]">
						<div>24k likes</div>
						<div>24k comments</div>
						<div>24k retweets</div>
					</div>
				</div>
				<div className="mt-2 flex border-t border-t-offWhite py-1">
					<div
						className={`flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-lg p-3 text-xl hover:bg-offWhite md:text-base ${
							showReplyBox ? "bg-offWhite" : "bg-inherit"
						}`}
						onClick={() => setShowReplyBox((prev) => !prev)}
					>
						<BiComment />
						<span>Comment</span>
					</div>
					<div
						className={`flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-lg p-3 text-xl hover:bg-offWhite md:text-base ${
							isRetweeted ? "text-[#27ae60]" : "text-inherit"
						}`}
						onClick={() => setIsRetweeted((prev) => !prev)}
					>
						<MdLoop />
						<span>Retweet{isRetweeted && "ed"}</span>
					</div>
					<div
						className={`flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-lg p-3 text-xl hover:bg-offWhite md:text-base ${
							isLiked ? "text-[#eb5757]" : "text-inherit"
						}`}
						onClick={() => setIsLiked((prev) => !prev)}
					>
						<MdFavoriteBorder />
						<span>Like{isLiked && "d"}</span>
					</div>
					<div
						className={`flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-lg p-3 text-xl hover:bg-offWhite md:text-base ${
							isSaved ? "text-secondaryBlue" : "text-inherit"
						}`}
						onClick={() => setIsSaved((prev) => !prev)}
					>
						<MdBookmarkBorder />
						<span>Save{isSaved && "d"}</span>
					</div>
				</div>
				{showReplyBox && (
					<form className="gap4 flex border-t border-t-offWhite p-2.5" onSubmit={onReplySubmit}>
						<div className="h-10 w-10 overflow-hidden rounded-lg">
							<img className="image-center" src={BlankPNG} alt="picture" />
						</div>
						<input
							className="placeholder:[#bdbdbd] w-full rounded-lg border border-offWhite bg-[#fafafa] px-3 py-2.5 pr-[50px] text-sm font-medium text-[#4f4f4f] outline-none"
							type="text"
							placeholder="Tweet your reply"
							value={enteredReply}
							onChange={(e) => setEnteredReply(e.target.value)}
						/>
					</form>
				)}
				{showComments && (
					<div className="flex flex-col gap-[18px] border-t border-t-offWhite pt-5">
						<Reply>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum aut pariatur ad voluptatem facere
							doloribus fuga harum, exercitationem sequi a debitis magnam eius recusandae ullam in molestias quod
							tenetur id.
						</Reply>
						<Reply>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum aut pariatur ad voluptatem facere
							doloribus fuga harum, exercitationem sequi a debitis magnam eius recusandae ullam in molestias quod
							tenetur id.
						</Reply>
					</div>
				)}
			</div>
		</div>
	);
}

export default Tweet;
