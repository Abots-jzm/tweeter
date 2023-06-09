import { useMutation } from "@tanstack/react-query";
import { db } from "../../api/firebase";
import { arrayRemove, arrayUnion, doc, increment, updateDoc, writeBatch } from "firebase/firestore";
import { FollowPayload } from "./types";

async function follow({ personToFollowId, userId, action }: FollowPayload) {
	const personToFollowRef = doc(db, "users", personToFollowId);
	const userRef = doc(db, "users", userId);

	const batch = writeBatch(db);
	if (action === "follow") {
		batch.update(personToFollowRef, { followers: arrayUnion(userId) });
		batch.update(userRef, { following: arrayUnion(personToFollowId) });
	} else {
		batch.update(personToFollowRef, { followers: arrayRemove(userId) });
		batch.update(userRef, { following: arrayRemove(personToFollowId) });
	}

	return await batch.commit();
}

function useFollow() {
	return useMutation(follow);
}

export default useFollow;
