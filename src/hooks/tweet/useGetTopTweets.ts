import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { Tweet } from "./types";

async function getTopTweets() {
	const tweetsCollection = collection(db, "tweets");
	const topTweetsQuery = query(tweetsCollection, orderBy("impressionsIndex", "desc"));

	return (await getDocs(topTweetsQuery)).docs.map((doc) => doc.data()) as Tweet[];
}

function useGetTopTweets(userId: string | null, enabled: boolean) {
	return useQuery([QueryKeys.topTweets], () => getTopTweets(), {
		enabled,
		select: (data) => data.filter((tweet) => tweet.uid !== userId),
	});
}

export default useGetTopTweets;
