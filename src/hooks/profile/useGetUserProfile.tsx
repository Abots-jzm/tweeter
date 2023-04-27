import { useQuery } from "@tanstack/react-query";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase";
import { UserData } from "./types";
import { QueryKeys } from "../data";

async function getUserProfile(userId: string) {
	return await getDoc(doc(db, "users/" + userId));
}

function useGetUserProfile(userId: string | null) {
	return useQuery([QueryKeys.userProfile, userId], () => getUserProfile(userId!), {
		refetchOnWindowFocus: false,
		select: (data) => data.data() as UserData,
	});
}

export default useGetUserProfile;
