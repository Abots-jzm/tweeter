import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, limit, or, orderBy, query, where } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { Tweet } from "./types";

async function getHomeTweets(userId: string, following: string[]) {
	const tweetsCollection = collection(db, "tweets");

	if (following.length > 0) {
		const homeTweetsQuery = query(
			tweetsCollection,
			or(
				where("followers", "array-contains", userId),
				where("uid", "==", userId),
				where("retweets", "array-contains-any", following),
				where("likes", "array-contains-any", following)
			)
		);
		return (await getDocs(homeTweetsQuery)).docs.map((doc) => doc.data());
	} else {
		const topTweetsQuery = query(tweetsCollection, orderBy("impressionsIndex"), limit(20));
		const userTweet = query(tweetsCollection, where("uid", "==", userId));

		const topTweets = await getDocs(topTweetsQuery);
		const userTweets = await getDocs(userTweet);

		return topTweets.docs.map((doc) => doc.data()).concat(userTweets.docs.map((doc) => doc.data()));
	}
}

function useGetHomeTweets(userId: string | null, following?: string[]) {
	return useQuery([QueryKeys.homeTweets], () => getHomeTweets(userId!, following!), {
		enabled: !!following,
		select: (data) => {
			const sortedData = data
				.sort((a, b) => a.time.toDate().getTime() - b.time.toDate().getTime())
				.reverse() as Tweet[];

			const seen = new Set<string>();
			const unique = sortedData.reduce((acc: Tweet[], current: Tweet) => {
				if (!seen.has(current.id)) {
					acc.push(current);
					seen.add(current.id);
				}
				return acc;
			}, []);

			return unique;
		},
	});
}

export default useGetHomeTweets;
