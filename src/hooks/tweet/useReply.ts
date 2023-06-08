import { useMutation } from "@tanstack/react-query";
import { db } from "../../api/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { ReplyPayload } from "./types";

async function reply({ tweetId, reply }: ReplyPayload) {
	const tweetRef = doc(db, "tweets", tweetId);

	return await updateDoc(tweetRef, { replies: arrayUnion(reply) });
}

function useReply() {
	return useMutation(reply);
}

export default useReply;
