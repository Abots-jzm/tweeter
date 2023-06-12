import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { Tweet } from "./types";

async function getLatestTweets() {
	const tweetsCollection = collection(db, "tweets");
	const latestTweetsQuery = query(tweetsCollection, orderBy("time", "desc"));

	return (await getDocs(latestTweetsQuery)).docs.map((doc) => doc.data()) as Tweet[];
}

function useGetLatestTweets(userId: string | null, enabled: boolean) {
	return useQuery([QueryKeys.latestTweets], () => getLatestTweets(), {
		enabled,
		select: (data) => data.filter((tweet) => tweet.uid !== userId),
	});
}

export default useGetLatestTweets;
