import { useQuery } from "@tanstack/react-query";
import { DocumentData, Query, collection, getDocs, or, query, where } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { Tweet } from "./types";

async function getHomeTweets(userId: string, following: string[]) {
	const tweetsCollection = collection(db, "tweets");
	let homeTweetsQuery: Query<DocumentData>;

	if (following.length > 0)
		homeTweetsQuery = query(
			tweetsCollection,
			or(
				where("followers", "array-contains", userId),
				where("uid", "==", userId),
				where("retweets", "array-contains-any", following)
			)
		);
	else
		homeTweetsQuery = query(
			tweetsCollection,
			or(where("followers", "array-contains", userId), where("uid", "==", userId))
		);

	return await getDocs(homeTweetsQuery);
}

function useGetHomeTweets(userId: string | null, following?: string[]) {
	return useQuery([QueryKeys.homeTweets], () => getHomeTweets(userId!, following!), {
		refetchOnWindowFocus: false,
		enabled: !!following,
		select: (data) => {
			const mappedData: Tweet[] = [];
			data.forEach((doc) => mappedData.push(doc.data() as Tweet));
			return mappedData.reverse();
		},
	});
}

export default useGetHomeTweets;
