import { useMutation } from "@tanstack/react-query";
import { db } from "../../api/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { BookmarkPayload } from "./types";

async function bookmark({ tweetId, userId, action }: BookmarkPayload) {
	const tweetRef = doc(db, "tweets", tweetId);

	if (action === "save") return await updateDoc(tweetRef, { bookmarks: arrayUnion(userId) });
	else return await updateDoc(tweetRef, { bookmarks: arrayRemove(userId) });
}

function useBookmark() {
	return useMutation(bookmark);
}

export default useBookmark;
