import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db, storage } from "../../api/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { arrayUnion, doc, writeBatch } from "firebase/firestore";
import { UpdateProfilePayload, UserData } from "./types";
import { QueryKeys } from "../data";
import { useAppSelector } from "../../store/hooks";

async function updateProfile(payload: UpdateProfilePayload) {
	let photoUrl;
	let coverUrl;

	if (payload.photo) {
		const imagesRef = ref(storage, payload.uid + "/photo");
		const snapShot = await uploadBytes(imagesRef, payload.photo);
		photoUrl = await getDownloadURL(snapShot.ref);
	}

	if (payload.cover) {
		const imagesRef = ref(storage, payload.uid + "/cover");
		const snapShot = await uploadBytes(imagesRef, payload.cover);
		coverUrl = await getDownloadURL(snapShot.ref);
	}

	const user: UserData = {
		displayName: payload.displayName,
		bio: payload.bio,
		imageIndex: payload.imageIndex,
		tweetIndex: payload.tweetIndex,
		followers: payload.followers,
		following: payload.following,
	};
	if (photoUrl) user.photoURL = photoUrl;
	if (coverUrl) user.coverURL = coverUrl;

	const batch = writeBatch(db);
	batch.update(doc(db, "default/info"), { allNames: arrayUnion(user.displayName) });
	batch.set(doc(db, "users/" + payload.uid), user, { merge: true });

	return await batch.commit();
}

function useUpdateUserProfile() {
	const queryClient = useQueryClient();
	const userId = useAppSelector((state) => state.auth.uid);

	return useMutation(updateProfile, {
		onSuccess() {
			queryClient.invalidateQueries([QueryKeys.userProfile, userId]);
			queryClient.invalidateQueries([QueryKeys.allNames]);
		},
	});
}

export default useUpdateUserProfile;
