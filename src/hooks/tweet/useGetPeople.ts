import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../api/firebase";
import { QueryKeys } from "../data";
import { UserData } from "../profile/types";

async function getPeople() {
	const usersCollection = collection(db, "users");
	const peopleQuery = query(usersCollection, orderBy("followers", "desc"));

	return (await getDocs(peopleQuery)).docs.map((doc) => doc.data()) as UserData[];
}

function useGetPeople(enabled: boolean, userId?: string, limit?: number) {
	return useQuery([QueryKeys.people, limit], () => getPeople(), {
		enabled,
		select: (data) => {
			if (limit && userId)
				return data.filter((user) => user.userId !== userId && !user.followers.includes(userId)).slice(0, limit);
			return data;
		},
	});
}

export default useGetPeople;
