import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { Tweet } from "./types";

async function getAllUserLikes(userId: string) {
	const tweetsCollection = collection(db, "tweets");
	const allUserLikesQuery = query(tweetsCollection, where("likes", "array-contains", userId));

	return (await getDocs(allUserLikesQuery)).docs.map((doc) => doc.data()).reverse() as Tweet[];
}

function useGetAllUserLikes(enabled: boolean, userId?: string) {
	return useQuery([QueryKeys.userLikes, userId], () => getAllUserLikes(userId!), {
		enabled,
	});
}

export default useGetAllUserLikes;
