import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import BlankPNG from "../assets/blank-profile-picture.png";
import { TbPhotoEdit } from "react-icons/tb";
import { MdArrowBack } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { authActions } from "../store/slices/authSlice";
import useGetAllNames from "../hooks/profile/useGetAllNames";
import useGetUserProfile from "../hooks/profile/useGetUserProfile";
import useUpdateUserProfile from "../hooks/profile/useUpdateUserProfile";
import { Paths } from "../routes";

type Props = {
	isSetup?: boolean;
};

function ProfileEdit({ isSetup }: Props) {
	const [currentPhoto, setCurrentPhoto] = useState<File>();
	const [enteredCover, setEnteredCover] = useState<File>();
	const [enteredName, setEnteredName] = useState("");
	const [enteredBio, setEnteredBio] = useState("");
	const [userNameError, setUserNameError] = useState(false);
	const [userNameTouched, setUserNameTouched] = useState(false);

	const navigate = useNavigate();
	const uid = useAppSelector((state) => state.auth.uid);
	const dispatch = useAppDispatch();

	const { data: allNames } = useGetAllNames();
	const { data: userProfile } = useGetUserProfile(uid);
	const { mutate: updateProfile, isLoading: updatingProfile } = useUpdateUserProfile();

	useEffect(() => {
		if (!userProfile) return;

		setEnteredName(userProfile.displayName);
		setEnteredBio(userProfile.bio);
	}, [userProfile]);

	function onPhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.currentTarget.files) return;

		setCurrentPhoto(e.currentTarget.files[0]);
	}

	function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.currentTarget.files) return;

		setEnteredCover(e.currentTarget.files[0]);
	}

	function getPhotoSrc(): string {
		if (currentPhoto) return URL.createObjectURL(currentPhoto);
		if (userProfile) return userProfile.photoURL || BlankPNG;
		else return BlankPNG;
	}

	function getCoverSrc(): string {
		if (enteredCover) return URL.createObjectURL(enteredCover);
		if (userProfile) return userProfile.coverURL || BlankPNG;
		else return BlankPNG;
	}

	function validateNames(name: string) {
		const existingName = allNames?.find((value) => name === value);

		if (existingName && existingName !== userProfile?.displayName) setUserNameError(true);
		else setUserNameError(false);
	}

	function onEnteredNameChanged(e: React.ChangeEvent<HTMLInputElement>) {
		const name = e.target.value;
		setEnteredName(name);

		if (!userNameTouched) return;
		validateNames(name);
	}

	function onEnteredNameBlured() {
		setUserNameTouched(true);
		validateNames(enteredName);
	}

	function onSave(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (!uid) {
			dispatch(authActions.logout());
			return;
		}

		if (userNameError) return;

		updateProfile(
			{ bio: enteredBio, dispayName: enteredName, cover: enteredCover, photo: currentPhoto, uid },
			{
				onSuccess() {
					if (isSetup) navigate(Paths.home, { replace: true });
					else navigate(-1);
				},
			}
		);
	}

	return (
		<Container isSetup={!!isSetup}>
			<div>
				<Heading>Profile {isSetup ? "Setup" : "Edit"}</Heading>
				<Cover>
					<div>{<img src={getCoverSrc()} alt="cover" />}</div>
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
				<Form onSubmit={onSave} isSetup={!!isSetup}>
					<div>
						<label htmlFor="displayName">Display Name</label>
						<input
							type="text"
							name="displayName"
							id="dispayName"
							placeholder="Enter display name"
							onChange={onEnteredNameChanged}
							onBlur={onEnteredNameBlured}
							value={enteredName}
							required
						/>
						{userNameError && <ErrorMessage>This username already exist.</ErrorMessage>}
					</div>
					<div>
						<label htmlFor="bio">Bio</label>
						<textarea
							name="bio"
							id="bio"
							placeholder="Enter Bio"
							required
							onChange={(e) => setEnteredBio(e.target.value)}
							value={enteredBio}
						/>
					</div>
					<div className="buttons">
						{!isSetup && (
							<Back onClick={() => navigate(-1)}>
								<MdArrowBack /> Back
							</Back>
						)}
						<button type="submit">save {updatingProfile && <Spinner />}</button>
					</div>
				</Form>
			</div>
		</Container>
	);
}

export default ProfileEdit;

const spinner = keyframes`
   100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	border-left: 2px solid white;
	animation: ${spinner} 0.7s linear infinite;
`;

const ErrorMessage = styled.div`
	font-size: 1.4rem;
	color: #ff414e;
	margin-top: 1rem;
	align-self: flex-start;
`;

const Back = styled.div`
	color: #2f80ed;
	font-size: 1.8rem;
	display: flex;
	align-items: center;
	gap: 0.8rem;
	cursor: pointer;
	text-decoration: none;
`;

interface IForm {
	isSetup: boolean;
}

const Form = styled.form<IForm>`
	margin-top: 2.5rem;
	display: flex;
	flex-direction: column;
	gap: 1.8rem;

	.buttons {
		display: flex;
		align-items: center;
		justify-content: ${(props) => (props.isSetup ? "flex-end" : "space-between")};
		/* justify-content: space-between; */
		/* justify-content: flex-end; */
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

interface IContainer {
	isSetup: boolean;
}

const Container = styled.div<IContainer>`
	display: grid;
	place-items: center;
	height: ${(props) => (props.isSetup ? "100vh" : "100%")};
	background-color: #f2f2f2;

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
		background-color: white;

		& > div {
			box-shadow: none;
			padding: 2rem;
		}
	}
`;
