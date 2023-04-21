import React, { useState } from "react";
import { MdBookmarkBorder, MdFavoriteBorder, MdLoop, MdOutlineImage } from "react-icons/md";
import { BiComment } from "react-icons/bi";
import styled from "styled-components";
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
				<ReTweet>
					<MdLoop />
					<span>{retweeted} Retweeted</span>
				</ReTweet>
			)}
			<Container replies={replies}>
				<div onClick={() => setShowComments((prev) => !prev)}>
					<Top>
						<Picture>
							<img src={BlankPNG} alt={"name" + ""} />
						</Picture>
						<div>
							<div className="name">Micheal Stanley</div>
							<div className="time">24 August at 20:30</div>
						</div>
					</Top>
					<Content>{children}</Content>
					{image && (
						<ImageContainer>
							<img src={image} alt="image" />
						</ImageContainer>
					)}
					<Details>
						<div>24k likes</div>
						<div>24k comments</div>
						<div>24k retweets</div>
					</Details>
				</div>
				<Actions isCommenting={showReplyBox} isRetweeted={isRetweeted} isLiked={isLiked} isSaved={isSaved}>
					<div className="comment" onClick={() => setShowReplyBox((prev) => !prev)}>
						<BiComment />
						<span>Comment</span>
					</div>
					<div className="retweet" onClick={() => setIsRetweeted((prev) => !prev)}>
						<MdLoop />
						<span>Retweet{isRetweeted && "ed"}</span>
					</div>
					<div className="like" onClick={() => setIsLiked((prev) => !prev)}>
						<MdFavoriteBorder />
						<span>Like{isLiked && "d"}</span>
					</div>
					<div className="save" onClick={() => setIsSaved((prev) => !prev)}>
						<MdBookmarkBorder />
						<span>Save{isSaved && "d"}</span>
					</div>
				</Actions>
				{showReplyBox && (
					<MakeAReply onSubmit={onReplySubmit}>
						<Picture>
							<img src={BlankPNG} alt="picture" />
						</Picture>
						<input
							type="text"
							placeholder="Tweet your reply"
							value={enteredReply}
							onChange={(e) => setEnteredReply(e.target.value)}
						/>
					</MakeAReply>
				)}
				{showComments && (
					<RepliesContainer>
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
					</RepliesContainer>
				)}
			</Container>
		</div>
	);
}

export default Tweet;

const RepliesContainer = styled.div`
	border-top: 1px solid #f2f2f2;
	padding-top: 2rem;
	display: flex;
	flex-direction: column;
	gap: 1.8rem;
`;

const MakeAReply = styled.form`
	padding: 1rem;
	display: flex;
	gap: 1.6rem;
	border-top: 1px solid #f2f2f2;

	input {
		border-radius: 8px;
		width: 100%;
		outline: none;
		border: 1px solid #f2f2f2;
		background-color: #fafafa;
		color: #4f4f4f;
		font-size: 1.4rem;
		padding: 1rem 1.2rem;
		padding-right: 5rem;

		&::placeholder {
			color: #bdbdbd;
			font-weight: 500;
		}
	}
`;

interface IActions {
	isRetweeted?: boolean;
	isLiked?: boolean;
	isSaved?: boolean;
	isCommenting: boolean;
}

const Actions = styled.div<IActions>`
	display: flex;
	margin-top: 0.8rem;
	padding: 0.3rem 0;
	border-top: 1px solid #f2f2f2;

	.comment {
		background-color: ${(props) => (props.isCommenting ? "#f2f2f2" : "inherit")};
	}

	.retweet {
		color: ${(props) => (props.isRetweeted ? "#27ae60" : "inherit")};
	}

	.like {
		color: ${(props) => (props.isLiked ? "#eb5757" : "inherit")};
	}

	.save {
		color: ${(props) => (props.isSaved ? "#2d9cdb" : "inherit")};
	}

	& > div {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1.2rem;
		padding: 1.2rem;
		cursor: pointer;

		&:hover {
			background-color: #f2f2f2;
			border-radius: 8px;
		}

		@media only screen and (max-width: 768px) {
			font-size: 2rem;

			span {
				display: none;
			}
		}
	}
`;

const Details = styled.div`
	margin-top: 1.4rem;
	display: flex;
	justify-content: flex-end;
	gap: 1.6rem;
	font-size: 1.2rem;
	font-weight: 500;
	color: #bdbdbd;
`;

const ImageContainer = styled.div`
	height: 35rem;
	width: 100%;
	overflow: hidden;
	border-radius: 8px;
	margin-top: 2rem;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
`;

const Content = styled.div`
	margin-top: 2rem;
`;

const Picture = styled.div`
	width: 4rem;
	height: 4rem;
	overflow: hidden;
	border-radius: 8px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
`;

const Top = styled.div`
	display: flex;
	gap: 1.7rem;
	cursor: pointer;

	.name {
		font-family: "Poppins", sans-serif;
		font-weight: 500;
		color: black;
	}

	.time {
		color: #bdbdbd;
		font-size: 1.2rem;
	}
`;

interface IContainer {
	replies?: boolean;
}

const Container = styled.div<IContainer>`
	background-color: #ffffff;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
	border-radius: 8px;
	padding: 2rem;

	& > div {
		cursor: ${(props) => (props.replies ? "pointer" : "default")};
	}
`;

const ReTweet = styled.div`
	display: flex;
	align-items: center;
	color: #828282;
	font-size: 1.4rem;
	margin-bottom: 1rem;
	gap: 1rem;
`;
