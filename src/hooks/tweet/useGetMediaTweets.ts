import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { Tweet } from "./types";

async function getMediaTweets() {
	const tweetsCollection = collection(db, "tweets");
	const mediaTweets = query(tweetsCollection, orderBy("imageUrl", "desc"));

	return (await getDocs(mediaTweets)).docs.map((doc) => doc.data());
}

function useGetMediaTweets(userId: string | null, enabled: boolean) {
	return useQuery([QueryKeys.mediaTweets], () => getMediaTweets(), {
		refetchOnWindowFocus: false,
		enabled,
		select: (data) => {
			const typedData = data as Tweet[];
			return typedData.filter((tweet) => tweet.uid !== userId).sort((a, b) => b.impressionsIndex - a.impressionsIndex);
		},
	});
}

export default useGetMediaTweets;
