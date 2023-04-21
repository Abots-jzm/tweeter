import React, { FormEvent, useRef, useState } from "react";
import styled from "styled-components";
import BlankPNG from "../../assets/blank-profile-picture.png";
import { MdOutlineImage, MdPeople, MdPublic } from "react-icons/md";

type Props = {
	replyModalOpen: boolean;
	setReplyModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function TweetSomething({ replyModalOpen, setReplyModalOpen }: Props) {
	const [replyType, setReplyType] = useState<"everyone" | "people you follow">("everyone");
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	function onTweetSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	function onTextAreaInput() {
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
		<Container onClick={() => setReplyModalOpen(false)}>
			<Heading>Tweet something</Heading>
			<Body onSubmit={onTweetSubmit}>
				<Picture>
					<img src={BlankPNG} alt={"name" + " picture"} />
				</Picture>
				<div>
					<div className="expanding-area">
						<textarea
							ref={textAreaRef}
							name="tweet"
							id="tweet"
							placeholder="What's happening?"
							onInput={onTextAreaInput}
						/>
					</div>
					<Bottom>
						<div>
							<MdOutlineImage />
						</div>
						<div className="reply-type" onClick={toggleReplyModal}>
							{replyType === "everyone" && (
								<>
									<MdPublic />
									<span>Everyone can reply</span>
								</>
							)}
							{replyType === "people you follow" && (
								<>
									<MdPeople />
									<span>People you follow</span>
								</>
							)}
							<ReplyModal isOpen={replyModalOpen} onClick={(e) => e.stopPropagation()}>
								<div className="heading">Who can reply?</div>
								<div className="info">Choose who can reply to this Tweet.</div>
								<div className="options">
									<div onClick={setToEveryone}>
										<MdPublic />
										<span>Everyone can reply</span>
									</div>
									<div onClick={setToFollow}>
										<MdPeople />
										<span>People you follow</span>
									</div>
								</div>
							</ReplyModal>
						</div>
						<button type="submit">Tweet</button>
					</Bottom>
				</div>
			</Body>
		</Container>
	);
}

export default TweetSomething;

interface IReplyModal {
	isOpen: boolean;
}

const ReplyModal = styled.div<IReplyModal>`
	display: ${(props) => (props.isOpen ? "block" : "none")};
	position: absolute;
	top: 3rem;
	left: 0;
	width: 23.4rem;
	padding: 0.9rem 1.3rem;
	background-color: white;
	border: 1px solid #e0e0e0;
	color: #4f4f4f;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
	border-radius: 12px;
	font-size: 1.2rem;
	font-weight: 500;

	.heading {
		font-family: "Poppins", sans-serif;
		font-weight: 600;
	}

	.info {
		color: #828282;
		font-weight: 400;
	}

	.options {
		width: 100%;
		margin-top: 1.5rem;

		div {
			display: flex;
			gap: 0.7rem;
			align-items: center;
			padding: 1.2rem;
			font-size: 2rem;
			border-radius: 8px;

			span {
				font-weight: 1.2rem;
			}

			&:hover {
				background-color: #f2f2f2;
			}
		}
	}
`;

const Bottom = styled.div`
	display: flex;
	gap: 1.4rem;
	color: #2f80ed;
	align-self: stretch;
	align-items: flex-end;

	button {
		margin-left: auto;
		background-color: #2f80ed;
		color: white;
		padding: 0.8rem 2.4rem;
		border-radius: 4px;
	}

	& > div {
		cursor: pointer;
		display: flex;
		align-items: center;
	}

	.reply-type {
		gap: 0.7rem;
		position: relative;

		span {
			font-size: 1.2rem;
			font-weight: 500;
		}
	}
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

	& + div {
		flex: 1;
	}
`;

const Body = styled.form`
	display: flex;
	gap: 1.2rem;

	textarea {
		font: inherit;
		height: 5rem;
		margin-top: 0.9rem;
		font-weight: 500;
		color: #4f4f4f;
		width: 100%;
		resize: none;
		border: none;
		outline: none;

		&::placeholder {
			color: #bdbdbd;
		}
	}
`;

const Heading = styled.div`
	color: #4f4f4f;
	font-family: "Poppins", sans-serif;
	font-weight: 600;
	padding-bottom: 0.8rem;
	border-bottom: 1px solid #e0e0e0;
	font-size: 1.2rem;
	margin-bottom: 0.8rem;
`;

const Container = styled.div`
	width: 100%;
	padding: 1rem 2rem;
	background-color: #ffffff;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
	border-radius: 12px;
`;
