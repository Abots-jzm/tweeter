import { useMutation } from "@tanstack/react-query";
import { db } from "../../api/firebase";
import { arrayUnion, doc, increment, updateDoc } from "firebase/firestore";
import { ReplyPayload } from "./types";

async function reply({ tweetId, reply }: ReplyPayload) {
	const tweetRef = doc(db, "tweets", tweetId);

	return await updateDoc(tweetRef, { replies: arrayUnion(reply), impressionsIndex: increment(5) });
}

function useReply() {
	return useMutation(reply);
}

export default useReply;
