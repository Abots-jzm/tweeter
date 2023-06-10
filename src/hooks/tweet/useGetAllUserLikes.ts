import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";

async function getAllUserLikes(userId: string) {
	const tweetsCollection = collection(db, "tweets");
	const allUserLikesQuery = query(tweetsCollection, where("likes", "array-contains", userId));

	return (await getDocs(allUserLikesQuery)).docs.map((doc) => doc.data()).reverse();
}

function useGetAllUserLikes(enabled: boolean, userId?: string) {
	return useQuery([QueryKeys.userLikes, userId], () => getAllUserLikes(userId!), {
		refetchOnWindowFocus: false,
		enabled,
	});
}

export default useGetAllUserLikes;
