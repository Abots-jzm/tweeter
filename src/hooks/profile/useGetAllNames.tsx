import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "../data";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../api/firebase";

async function getAllNames() {
	return await getDoc(doc(db, "default/info"));
}

function useGetAllNames() {
	return useQuery([QueryKeys.allNames], () => getAllNames(), {
		select: (data) => data.data()!.allNames as string[],
	});
}

export default useGetAllNames;
