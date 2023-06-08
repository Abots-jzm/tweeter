import { useMutation } from "@tanstack/react-query";
import { db } from "../../api/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { LikePayload } from "./types";

async function like({ tweetId, userId, action }: LikePayload) {
	const tweetRef = doc(db, "tweets", tweetId);

	if (action === "like") return await updateDoc(tweetRef, { likes: arrayUnion(userId) });
	else return await updateDoc(tweetRef, { likes: arrayRemove(userId) });
}

function useLike() {
	return useMutation(like);
}

export default useLike;
