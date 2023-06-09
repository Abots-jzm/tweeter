import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { Tweet } from "./types";

async function getLatestTweets() {
	const tweetsCollection = collection(db, "tweets");
	const latestTweetsQuery = query(tweetsCollection, orderBy("time", "desc"));

	return (await getDocs(latestTweetsQuery)).docs.map((doc) => doc.data());
}

function useGetLatestTweets(userId: string | null, enabled: boolean) {
	return useQuery([QueryKeys.latestTweets], () => getLatestTweets(), {
		refetchOnWindowFocus: false,
		enabled,
		select: (data) => {
			const typedData = data as Tweet[];
			return typedData.filter((tweet) => tweet.uid !== userId);
		},
	});
}

export default useGetLatestTweets;
