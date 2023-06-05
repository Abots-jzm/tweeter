import React from "react";
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

	const { register, handleSubmit, watch, formState } = useForm<FormValues>({
		values: { displayName: userProfile?.displayName || "", bio: userProfile?.bio || "" },
		mode: "onTouched",
	});
	const { errors, isDirty, isValid } = formState;

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
		<div className={`grid place-items-center bg-white sm:bg-offWhite ${isSetup ? "h-screen" : "h-full"}`}>
			<div className="relative w-full max-w-[473px] rounded-xl bg-white p-5 px-[58px] shadow-none sm:py-[30px] sm:shadow-soft">
				<div className="flex items-center justify-between text-2xl">Profile {isSetup ? "Setup" : "Edit"}</div>
				<div className="relative mt-[30px] items-center">
					<div className="h-[100px] w-full overflow-hidden rounded-lg bg-ash">
						{(userProfile?.coverURL || watch("cover")?.[0]) && (
							<img className="image-center" src={getCoverSrc()} alt="cover" />
						)}
					</div>
					<label
						className="absolute left-4 top-4 grid h-[30px] w-[30px] cursor-pointer place-items-center rounded-full bg-transparentBlack text-white"
						htmlFor="cover"
					>
						<TbPhotoEdit />
					</label>
					<input className="hidden" type="file" id="cover" accept="image/*" {...register("cover")} />
				</div>
				<div className="relative mt-[30px] items-center">
					<div className="h-[60px] w-[60px] overflow-hidden rounded-lg">
						<img className="image-center" src={getPhotoSrc()} alt="picture" />
					</div>
					<label
						className="absolute left-4 top-4 grid h-[30px] w-[30px] cursor-pointer place-items-center rounded-full bg-transparentBlack text-white"
						htmlFor="photo"
					>
						<TbPhotoEdit />
					</label>
					<input className="hidden" type="file" id="photo" accept="image/*" {...register("photo")} />
				</div>
				<form className="mt-6 flex flex-col gap-[18px]" onSubmit={handleSubmit(onSave)}>
					<div>
						<label className="mb-2 block" htmlFor="displayName">
							Display Name
						</label>
						<input
							className="w-full resize-none rounded-lg border border-ash p-2 placeholder:text-ash"
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
						{errors.displayName && <p className="error-message">This username already exist.</p>}
					</div>
					<div>
						<label className="mb-2 block" htmlFor="bio">
							Bio
						</label>
						<textarea
							className="h-[100px] w-full resize-none rounded-lg border border-ash p-2 placeholder:text-ash"
							id="bio"
							placeholder="Enter Bio"
							required
							{...register("bio")}
						/>
					</div>
					<div className={`flex items-center ${isSetup ? "justify-end" : "justify-between"}`}>
						{!isSetup && (
							<div
								className="flex cursor-pointer items-center gap-2 text-lg text-primaryBlue no-underline"
								onClick={() => navigate(-1)}
							>
								<MdArrowBack /> Back
							</div>
						)}
						<button
							className="flex items-center justify-center gap-2 self-end rounded-lg bg-primaryBlue px-6 py-2 text-white"
							type="submit"
							disabled={!isDirty || !isValid}
						>
							save {updatingProfile && <div className="spinner" />}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ProfileEdit;
