import { useMutation } from "@tanstack/react-query";
import { db } from "../../api/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { RetweetPayload, RetweetType } from "./types";

async function retweet({ tweetId, userId, userDisplayName, action }: RetweetPayload) {
	const tweetRef = doc(db, "tweets", tweetId);

	const retweetData: RetweetType = { name: userDisplayName, uid: userId };
	if (action === "retweet") return await updateDoc(tweetRef, { retweets: arrayUnion(retweetData) });
	else return await updateDoc(tweetRef, { retweets: arrayRemove(retweetData) });
}

function useRetweet() {
	return useMutation(retweet);
}

export default useRetweet;
