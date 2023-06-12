import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { Tweet } from "./types";

async function getBookmarks(userId: string) {
	const tweetsCollection = collection(db, "tweets");
	const bookmarksQuery = query(tweetsCollection, where("bookmarks", "array-contains", userId));

	return (await getDocs(bookmarksQuery)).docs.map((doc) => doc.data()).reverse() as Tweet[];
}

function useGetBookmarks(userId: string | null) {
	return useQuery([QueryKeys.bookmarks], () => getBookmarks(userId!));
}

export default useGetBookmarks;
