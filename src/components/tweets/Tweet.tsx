import React, { useEffect, useRef, useState } from "react";
import { MdBookmarkBorder, MdFavoriteBorder, MdLoop } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import BlankPNG from "../../assets/blank-profile-picture.png";
import { Timestamp } from "firebase/firestore";
import { Reply as ReplyType, RetweetType } from "../../hooks/tweet/types";
import { Link } from "react-router-dom";
import { Paths } from "../../routes";
import useLike from "../../hooks/tweet/useLike";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import useBookmark from "../../hooks/tweet/useBookmark";
import { authActions } from "../../store/slices/authSlice";
import useRetweet from "../../hooks/tweet/useRetweet";
import useGetUserProfile from "../../hooks/profile/useGetUserProfile";
import useReply from "../../hooks/tweet/useReply";
import Reply from "./Reply";

type Props = {
	children: React.ReactNode;
	retweeted?: string;
	image?: string;
	photo?: string;
	id: string;
	displayName: string;
	time: Timestamp;
	likes: string[];
	retweets: RetweetType[];
	replies: ReplyType[];
	userTweetId: string;
};

function Tweet({
	children,
	retweeted,
	image,
	replies,
	photo,
	displayName,
	time,
	likes,
	retweets,
	userTweetId,
	id,
}: Props) {
	const userId = useAppSelector((state) => state.auth.uid);
	const dispatch = useAppDispatch();

	const commentsRef = useRef<HTMLDivElement>(null);
	const [enteredReply, setEnteredReply] = useState("");
	const [showReplyBox, setShowReplyBox] = useState(false);
	const [showComments, setShowComments] = useState(false);
	const [displayedReplies, setDisplayedReplies] = useState(replies);
	const [isRetweeted, setIsRetweeted] = useState(
		userId ? retweets.some((retweetData) => retweetData.uid === userId) : false
	);
	const [noOfRetweets, setNoOfRetweets] = useState(retweets.length);
	const [isLiked, setIsLiked] = useState(userId ? likes.includes(userId) : false);
	const [noOfLikes, setNoOfLikes] = useState(likes.length);
	const [isSaved, setIsSaved] = useState(false);

	const { data: userProfile } = useGetUserProfile(userId);
	const { mutate: like } = useLike();
	const { mutate: bookmark } = useBookmark();
	const { mutate: retweet } = useRetweet();
	const { mutate: reply } = useReply();

	function onReplySubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (!userProfile || !userId) return;

		const newReply = {
			content: enteredReply,
			displayName: userProfile.displayName,
			likes: [],
			photoUrl: userProfile.photoURL,
			time: Timestamp.now(),
			uid: userId,
		};

		reply({ tweetId: id, reply: newReply });
		setDisplayedReplies((prev) => [newReply, ...prev]);
		setShowComments(true);
		setEnteredReply("");
	}

	function onLikeBtnClicked() {
		if (!userId) {
			dispatch(authActions.logout());
			return;
		}

		like({ action: isLiked ? "unlike" : "like", tweetId: id, userId });
		setIsLiked((prev) => !prev);
		setNoOfLikes((prev) => (isLiked ? prev - 1 : prev + 1));
	}

	function onRetweetBtnClicked() {
		if (!userId) {
			dispatch(authActions.logout());
			return;
		}

		if (!userProfile) return;

		retweet({
			action: isRetweeted ? "unretweet" : "retweet",
			tweetId: id,
			userId,
			userDisplayName: userProfile.displayName,
		});
		setIsRetweeted((prev) => !prev);
		setNoOfRetweets((prev) => (isRetweeted ? prev - 1 : prev + 1));
	}

	function onSaveBtnClicked() {
		if (!userId) {
			dispatch(authActions.logout());
			return;
		}

		bookmark({ action: isSaved ? "unsave" : "save", tweetId: id, userId });
		setIsSaved((prev) => !prev);
	}

	function formatTime(timestamp: Timestamp) {
		const date = new Date(timestamp.toDate());

		const formattedDate = date.toLocaleString("en-US", {
			day: "numeric",
			month: "long",
			hour: "numeric",
			minute: "2-digit",
		});

		return formattedDate;
	}

	function onTweetCicked() {
		setShowComments((prev) => !prev);
	}

	useEffect(() => {
		if (showComments === false) return;

		commentsRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [showComments]);

	return (
		<div>
			{retweeted && (
				<div className="mb-2.5 flex items-center gap-2.5 text-sm text-ash">
					<MdLoop />
					<span>{retweeted} Retweeted</span>
				</div>
			)}
			<div className="rounded-lg bg-white p-5 shadow-soft">
				<div className={`${displayedReplies.length > 0 ? "cursor-pointer" : "cursor-default"}`} onClick={onTweetCicked}>
					<div className="flex gap-4">
						<div className="h-10 w-10 overflow-hidden rounded-lg">
							<img className="image-center" src={photo || BlankPNG} alt={"name" + ""} />
						</div>
						<div>
							<Link
								to={`${Paths.profile}/${userTweetId}`}
								className="cursor-pointer font-poppins font-medium text-black "
							>
								{displayName}
							</Link>
							<div className="text-xs text-[#bdbdbd]">{formatTime(time)}</div>
						</div>
					</div>
					<div className="mt-5 whitespace-pre-line">{children}</div>
					{image && (
						<div className="mt-5 h-auto w-full overflow-hidden rounded-lg">
							<img className="image-center" src={image} alt="image" />
						</div>
					)}
					<div className="mt-3.5 flex justify-end gap-4 text-xs font-medium text-[#bdbdbd]">
						{noOfLikes > 0 && (
							<div>
								{noOfLikes} like{noOfLikes > 1 && "s"}
							</div>
						)}
						{replies.length > 0 && (
							<div>
								{replies.length} comment{replies.length > 1 && "s"}
							</div>
						)}
						{noOfRetweets > 0 && (
							<div>
								{noOfRetweets} retweet{noOfRetweets > 1 && "s"}
							</div>
						)}
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
						<span className="hidden md:inline">Comment</span>
					</div>
					<div
						className={`flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-lg p-3 text-xl hover:bg-offWhite md:text-base ${
							isRetweeted ? "text-[#27ae60]" : "text-inherit"
						}`}
						onClick={onRetweetBtnClicked}
					>
						<MdLoop />
						<span className="hidden md:inline">Retweet{isRetweeted && "ed"}</span>
					</div>
					<div
						className={`flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-lg p-3 text-xl hover:bg-offWhite md:text-base ${
							isLiked ? "text-[#eb5757]" : "text-inherit"
						}`}
						onClick={onLikeBtnClicked}
					>
						<MdFavoriteBorder />
						<span className="hidden md:inline">Like{isLiked && "d"}</span>
					</div>
					<div
						className={`flex flex-1 cursor-pointer items-center justify-center gap-3 rounded-lg p-3 text-xl hover:bg-offWhite md:text-base ${
							isSaved ? "text-secondaryBlue" : "text-inherit"
						}`}
						onClick={onSaveBtnClicked}
					>
						<MdBookmarkBorder />
						<span className="hidden md:inline">Save{isSaved && "d"}</span>
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
				{showComments && displayedReplies.length > 0 && (
					<div className="flex flex-col gap-[18px] border-t border-t-offWhite pt-5" ref={commentsRef}>
						{displayedReplies.map((reply) => (
							<Reply
								key={reply.time.toString()}
								photo={reply.photoUrl}
								name={reply.displayName}
								time={formatTime(reply.time)}
							>
								{reply.content}
							</Reply>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default Tweet;
