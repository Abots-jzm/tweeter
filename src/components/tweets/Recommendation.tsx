import React, { useState } from "react";
import styled from "styled-components";
import BlankPNG from "../../assets/blank-profile-picture.png";
import { MdPersonAdd } from "react-icons/md";

function Recommendation() {
	const [isFollowing, setIsFollowing] = useState(false);

	function truncateTxt(value: string, length: number) {
		return value.length > length ? `${value.substring(0, length)}...` : value;
	}

	return (
		<Container>
			<Top isFollowing={isFollowing}>
				<Picture>
					<img src={BlankPNG} alt={"name" + ""} />
				</Picture>
				<div>
					<div className="name">{truncateTxt("Micheal Stanley", isFollowing ? 8 : 10)}</div>
					<div className="followers">230k followers</div>
				</div>
				<button onClick={() => setIsFollowing((prev) => !prev)}>
					<MdPersonAdd />
					<span>{isFollowing ? "Unfollow" : "Follow"}</span>
				</button>
			</Top>
			<Bio>Photographer and Filmaker based in Copenhagen, Denmark</Bio>
			<Cover>
				<img
					src="https://images.immediate.co.uk/production/volatile/sites/30/2022/07/Black-beans-avocado-on-toast-d351aa6.jpg?quality=90&webp=true&fit=700,350"
					alt="bio"
				/>
			</Cover>
		</Container>
	);
}

export default Recommendation;

const Cover = styled.div`
	margin-top: 2.1rem;
	overflow: hidden;
	width: 100%;
	height: 7.7rem;
	border-radius: 8px;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
`;

const Bio = styled.div`
	margin-top: 1.9rem;
	font-weight: 500;
	color: #828282;
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

interface ITop {
	isFollowing: boolean;
}

const Top = styled.div<ITop>`
	display: flex;
	gap: 1.7rem;
	cursor: pointer;

	.name {
		font-family: "Poppins", sans-serif;
		font-weight: 500;
		color: black;
	}

	.followers {
		color: #bdbdbd;
		font-size: 1.2rem;
	}

	button {
		display: flex;
		align-items: center;
		align-self: center;
		gap: 0.5rem;
		color: white;
		background-color: ${(props) => (props.isFollowing ? "#828282" : "#2f80ed")};
		border-radius: 4px;
		padding: 0.4rem 1.3rem;
		margin-left: auto;

		span {
			font-size: 1.2rem;
			font-weight: 500;
		}
	}
`;

const Container = styled.div`
	padding-bottom: 2.2rem;

	&:not(:last-child) {
		border-bottom: 1px solid #e0e0e0;
		margin-bottom: 1.9rem;
	}
`;
