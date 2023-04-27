import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Paths } from "../../routes";
import { auth } from "../../api/firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { authActions } from "../../store/slices/authSlice";
import Layout from "../Layout";
import useGetUserProfile from "../../hooks/profile/useGetUserProfile";

type Props = {
	showLayout?: boolean;
};

function RequireAuth({ showLayout }: Props) {
	const user = useAppSelector((state) => state.auth.uid);
	const { data: userProfile, isLoading: profileIsLoading } = useGetUserProfile(user);
	const location = useLocation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) dispatch(authActions.login(user.uid));
			else dispatch(authActions.logout());
		});
	}, []);

	return (
		<>
			{user && !userProfile && !profileIsLoading && <Navigate to={Paths.profileSetup} replace />}
			{user && userProfile && showLayout && (
				<Layout>
					<Outlet />
				</Layout>
			)}
			{user && userProfile && !showLayout && <Outlet />}
			{!user && <Navigate to={Paths.auth.login} state={{ from: location }} replace />}
		</>
	);
}

export default RequireAuth;
