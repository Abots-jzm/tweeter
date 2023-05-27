import React from "react";
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
import { useForm } from "react-hook-form";

type Props = {
	isSetup?: boolean;
};

type FormValues = {
	photo?: FileList;
	cover?: FileList;
	displayName: string;
	bio: string;
};

function ProfileEdit({ isSetup }: Props) {
	const navigate = useNavigate();
	const uid = useAppSelector((state) => state.auth.uid);
	const dispatch = useAppDispatch();

	const { data: allNames } = useGetAllNames();
	const { data: userProfile } = useGetUserProfile(uid);
	const { mutate: updateProfile, isLoading: updatingProfile } = useUpdateUserProfile();
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isDirty, isValid },
	} = useForm<FormValues>({
		values: { displayName: userProfile?.displayName || "", bio: userProfile?.bio || "" },
		mode: "onTouched",
	});

	function getPhotoSrc(): string {
		const photo = watch("photo")?.[0];
		if (photo) return URL.createObjectURL(photo);
		if (userProfile) return userProfile.photoURL || BlankPNG;
		else return BlankPNG;
	}

	function getCoverSrc(): string {
		const cover = watch("cover")?.[0];
		if (cover) return URL.createObjectURL(cover);
		return userProfile?.coverURL || "";
	}

	function onSave({ bio, displayName, cover, photo }: FormValues) {
		if (!uid) {
			dispatch(authActions.logout());
			return;
		}

		updateProfile(
			{ bio, displayName, uid, cover: cover?.[0], photo: photo?.[0] },
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
					<div>{(userProfile?.coverURL || watch("cover")?.[0]) && <img src={getCoverSrc()} alt="cover" />}</div>
					<label htmlFor="cover">
						<TbPhotoEdit />
					</label>
					<input type="file" id="cover" accept="image/*" {...register("cover")} />
				</Cover>
				<Picture>
					<div>
						<img src={getPhotoSrc()} alt="picture" />
					</div>
					<label htmlFor="photo">
						<TbPhotoEdit />
					</label>
					<input type="file" id="photo" accept="image/*" {...register("photo")} />
				</Picture>
				<Form onSubmit={handleSubmit(onSave)} isSetup={!!isSetup}>
					<div>
						<label htmlFor="displayName">Display Name</label>
						<input
							type="text"
							id="dispayName"
							placeholder="Enter display name"
							required
							{...register("displayName", {
								validate(value) {
									const existingName = allNames?.find((name) => value === name);
									return !existingName || existingName === userProfile?.displayName;
								},
							})}
						/>
						{errors.displayName && <ErrorMessage>This username already exist.</ErrorMessage>}
					</div>
					<div>
						<label htmlFor="bio">Bio</label>
						<textarea id="bio" placeholder="Enter Bio" required {...register("bio")} />
					</div>
					<div className="buttons">
						{!isSetup && (
							<Back onClick={() => navigate(-1)}>
								<MdArrowBack /> Back
							</Back>
						)}
						<button type="submit" disabled={!isDirty || !isValid}>
							save {updatingProfile && <Spinner />}
						</button>
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
