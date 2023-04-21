import React from "react";
import styled from "styled-components";
import BlankPNG from "../../assets/blank-profile-picture.png";
import { MdFavoriteBorder } from "react-icons/md";

type Props = {
	children: React.ReactNode;
};

function Reply({ children }: Props) {
	return (
		<Container>
			<Picture>
				<img src={BlankPNG} alt={"name" + ""} />
			</Picture>
			<Right>
				<Top>
					<div className="name">Micheal Stanley</div>
					<div className="time">24 August at 20:30</div>
				</Top>
				<TextContent>{children}</TextContent>
				<Likes>
					<div>
						<MdFavoriteBorder />
						<span>Like</span>
					</div>
					<div>&middot;</div>
					<div>24k likes</div>
				</Likes>
			</Right>
		</Container>
	);
}

export default Reply;

const Right = styled.div`
	border-radius: 8px;
	background-color: #fafafa;
	padding: 0.9rem 1.5rem;
`;

const Likes = styled.div`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	margin-top: 2.5rem;
	font-size: 1.2rem;
	font-weight: 500;
	color: #bdbdbd;

	& > :first-child {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		cursor: pointer;
	}
`;

const TextContent = styled.div`
	margin-top: 0.8rem;
`;

const Picture = styled.div`
	width: 4rem;
	height: 4rem;
	overflow: hidden;
	border-radius: 8px;
	flex-shrink: 0;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
`;

const Top = styled.div`
	display: flex;
	gap: 1.4rem;
	align-items: baseline;

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

const Container = styled.div`
	display: flex;
	gap: 1rem;
`;
