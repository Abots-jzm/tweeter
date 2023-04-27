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
// function useGetUserProfile(enabled?: boolean, nextPath?: string) {
// 	const userId = useAppSelector((state) => state.auth.uid);
// 	const navigate = useNavigate();

// 	return useQuery(["user-profile"], () => getUserProfile(userId!), {
// 		enabled: enabled ?? true,
// 		refetchOnWindowFocus: false,
// 		select: (data) => data.data() as UserData,
// 		onSuccess(data) {
// 			if (enabled === undefined) return;

// 			if (!data) navigate(paths.PROFILE, { replace: true });
// 			else navigate(nextPath || paths.WELCOME, { replace: true });
// 		},
// 	});
// }

export default useGetUserProfile;
