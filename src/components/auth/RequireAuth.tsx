import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Paths } from "../../routes";
import { auth } from "../../api/firebase";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { authActions } from "../../store/slices/authSlice";

function RequireAuth() {
	const user = useAppSelector((state) => state.auth.uid);
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
			{user && <Outlet />}
			{!user && <Navigate to={Paths.auth.login} state={{ from: location }} replace />}
		</>
	);
}

export default RequireAuth;
