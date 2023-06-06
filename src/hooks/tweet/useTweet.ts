import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db, storage } from "../../api/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Timestamp, doc, writeBatch } from "firebase/firestore";
import { Tweet, TweetPayload } from "./types";
import { QueryKeys } from "../data";

async function tweet(payload: TweetPayload) {
	let imageUrl;

	if (payload.image) {
		const imagesRef = ref(storage, `${payload.uid}/${payload.user.imageIndex}`);
		const snapShot = await uploadBytes(imagesRef, payload.image);
		imageUrl = await getDownloadURL(snapShot.ref);
	}

	const id = `${payload.uid}-${payload.user.tweetIndex}`;
	const tweetData: Tweet = {
		id,
		uid: payload.uid,
		displayName: payload.user.displayName,
		time: Timestamp.now(),
		photoUrl: payload.user.photoURL || "",
		content: payload.content,
		tweetIndex: payload.user.tweetIndex,
		followers: payload.user.followers,
		following: payload.user.following,
		likes: [],
		retweets: [],
		bookmarks: [],
		replies: [],
		retweeted: false,
		isPublicReply: payload.isPublicReply,
	};
	if (imageUrl) tweetData.imageUrl = imageUrl;

	const batch = writeBatch(db);
	batch.set(doc(db, "tweets/" + id), tweetData);
	batch.update(doc(db, "users/" + payload.uid), { tweetIndex: payload.user.tweetIndex + 1 });
	if (imageUrl) batch.update(doc(db, "users/" + payload.uid), { imageIndex: payload.user.imageIndex + 1 });

	await batch.commit();
}

function useTweet() {
	const queryClient = useQueryClient();

	return useMutation(tweet, {
		onSuccess() {
			queryClient.invalidateQueries([QueryKeys.myTweets]);
		},
	});
}

export default useTweet;
