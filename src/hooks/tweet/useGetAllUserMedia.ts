import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { Tweet } from "./types";

async function getAllUserMedia(userId: string) {
	const tweetsCollection = collection(db, "tweets");
	const allUserMediaQuery = query(tweetsCollection, where("uid", "==", userId));

	return (await getDocs(allUserMediaQuery)).docs.map((doc) => doc.data()).reverse() as Tweet[];
}

function useGetAllUserMedia(enabled: boolean, userId?: string) {
	return useQuery([QueryKeys.userMedia, userId], () => getAllUserMedia(userId!), {
		refetchOnWindowFocus: false,
		enabled,
		select: (data) => data.filter((tweet) => !!tweet.imageUrl),
	});
}

export default useGetAllUserMedia;
