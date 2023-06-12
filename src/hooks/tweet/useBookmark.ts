import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "../../api/firebase";
import { arrayRemove, arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { BookmarkPayload } from "./types";
import { QueryKeys } from "../data";

async function bookmark({ tweetId, userId, action }: BookmarkPayload) {
	const tweetRef = doc(db, "tweets", tweetId);

	if (action === "save")
		return await updateDoc(tweetRef, { bookmarks: arrayUnion(userId), impressionsIndex: increment(3) });
	else return await updateDoc(tweetRef, { bookmarks: arrayRemove(userId), impressionsIndex: increment(-3) });
}

function useBookmark() {
	const queryClient = useQueryClient();
	return useMutation(bookmark, { onSuccess: () => queryClient.invalidateQueries([QueryKeys.bookmarks]) });
}

export default useBookmark;
