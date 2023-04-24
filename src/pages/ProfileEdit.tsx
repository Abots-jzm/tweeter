import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import BlankPNG from "../assets/blank-profile-picture.png";
import { TbPhotoEdit } from "react-icons/tb";
import { MdArrowBack } from "react-icons/md";

function ProfileEdit() {
	const [currentPhoto, setCurrentPhoto] = useState<File>();
	const [enteredCover, setEnteredCover] = useState<File>();
	const [enteredName, setEnteredName] = useState("");

	const navigate = useNavigate();

	function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.currentTarget.files) return;

		setCurrentPhoto(e.currentTarget.files[0]);
	}

	function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.currentTarget.files) return;

		console.log("shit");
		setEnteredCover(e.currentTarget.files[0]);
	}

	function getPhotoSrc(): string {
		if (currentPhoto) return URL.createObjectURL(currentPhoto);
		// if (data) return data.photoURL || BlanckPicture;
		else return BlankPNG;
	}

	function getCoverSrc(): string {
		if (enteredCover) return URL.createObjectURL(enteredCover);
		// if (data) return data.photoURL || BlanckPicture;
		else return BlankPNG;
	}

	function onSave(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
	}

	return (
		<Container>
			<div>
				<Heading>Profile Edit</Heading>
				<Cover>
					<div>{enteredCover && <img src={getCoverSrc()} alt="cover" />}</div>
					<label htmlFor="cover">
						<TbPhotoEdit />
					</label>
					<input type="file" name="cover" id="cover" onChange={onCoverChange} accept="image/*" />
				</Cover>
				<Picture>
					<div>
						<img src={getPhotoSrc()} alt="picture" />
					</div>
					<label htmlFor="photo">
						<TbPhotoEdit />
					</label>
					<input type="file" name="photo" id="photo" onChange={onPhotoChange} accept="image/*" />
				</Picture>
				<Form onSubmit={onSave}>
					<div>
						<label htmlFor="displayName">Display Name</label>
						<input
							type="text"
							name="displayName"
							id="dispayName"
							placeholder="Enter display name"
							onChange={(e) => setEnteredName(e.target.value)}
							required
						/>
					</div>
					<div>
						<label htmlFor="bio">Bio</label>
						<textarea name="bio" id="bio" placeholder="Enter Bio"></textarea>
					</div>
					<div className="buttons">
						<Back onClick={() => navigate(-1)}>
							<MdArrowBack /> Back
						</Back>
						<button type="submit">save</button>
					</div>
				</Form>
			</div>
		</Container>
	);
}

export default ProfileEdit;

// const spinner = `
//    100% {
//     transform: rotate(360deg);
//   }
// `;

// const Spinner = styled.div`
// 	width: 1.5rem;
// 	height: 1.5rem;
// 	border-radius: 50%;
// 	border-left: 2px solid white;
// 	animation: ${spinner} 0.7s linear infinite;
// `;

const Back = styled.div`
	color: #2f80ed;
	font-size: 1.8rem;
	display: flex;
	align-items: center;
	gap: 0.8rem;
	cursor: pointer;
	text-decoration: none;
`;

const Form = styled.form`
	margin-top: 2.5rem;
	display: flex;
	flex-direction: column;
	gap: 1.8rem;

	.buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	label {
		margin-bottom: 0.8rem;
		display: block;
	}

	input,
	textarea {
		font: inherit;
		padding: 0.8rem;
		border-radius: 0.8rem;
		border: 1px solid #828282;
		width: 100%;
		resize: none;

		&::placeholder {
			color: #828282;
		}
	}

	textarea {
		height: 10rem;
	}

	.display {
		color: #828282;
	}

	button {
		background: #2f80ed;
		border-radius: 8px;
		padding: 0.8rem 2.4rem;
		color: white;
		align-self: flex-end;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.8rem;
	}
`;

const Picture = styled.div`
	margin-top: 3rem;
	align-items: center;
	position: relative;

	label {
		position: absolute;
		top: 1.5rem;
		left: 1.5rem;
		background-color: transparent;
		color: white;
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.5);
		width: 3rem;
		height: 3rem;
		display: grid;
		border-radius: 100%;
		place-items: center;
	}

	input {
		display: none;
	}

	& > div {
		height: 6rem;
		width: 6rem;
		border-radius: 1rem;
		overflow: hidden;
	}

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
`;

const Cover = styled(Picture)`
	& > div {
		background-color: #828282;
		height: 10rem;
		width: 100%;
		border-radius: 1rem;
		overflow: hidden;
	}
`;

const Heading = styled.div`
	font-size: 2.4rem;
	display: flex;
	justify-content: space-between;
	align-items: center;

	div {
		padding: 0.8rem 2.4rem;
		border: 1px solid #828282;
		color: #828282;
		font-size: 1.6rem;
		border-radius: 8px;
		cursor: pointer;
	}
`;

const Container = styled.div`
	display: grid;
	place-items: center;
	height: 100%;

	& > div {
		padding: 3rem 5.8rem;
		border-radius: 1.2rem;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
		width: min(47.3rem, 100%);
		position: relative;
		background-color: white;
	}

	@media only screen and (max-width: 473px) {
		place-items: start;

		& > div {
			/* background-color: inherit; */
			box-shadow: none;
			padding: 2rem;
		}
	}
`;
