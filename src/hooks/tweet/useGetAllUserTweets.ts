import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { Tweet } from "./types";

async function getAllUserTweets(userId: string) {
	const tweetsCollection = collection(db, "tweets");
	const allUserTweetsQuery = query(tweetsCollection, where("uid", "==", userId));

	return (await getDocs(allUserTweetsQuery)).docs.map((doc) => doc.data()).reverse() as Tweet[];
}

function useGetAllUserTweets(enabled: boolean, userId?: string) {
	return useQuery([QueryKeys.userTweets, userId], () => getAllUserTweets(userId!), {
		enabled,
	});
}

export default useGetAllUserTweets;
