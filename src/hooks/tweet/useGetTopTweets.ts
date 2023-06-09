import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { Tweet } from "./types";

async function getTopTweets() {
	const tweetsCollection = collection(db, "tweets");
	const topTweetsQuery = query(tweetsCollection, orderBy("impressionsIndex", "desc"));

	return (await getDocs(topTweetsQuery)).docs.map((doc) => doc.data());
}

function useGetTopTweets(userId: string | null, enabled: boolean) {
	return useQuery([QueryKeys.topTweets], () => getTopTweets(), {
		refetchOnWindowFocus: false,
		enabled,
		select: (data) => {
			const typedData = data as Tweet[];
			return typedData.filter((tweet) => tweet.uid !== userId);
		},
	});
}

export default useGetTopTweets;
