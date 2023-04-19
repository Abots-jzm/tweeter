import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Paths } from "./routes";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import SignUp from "./pages/auth/Signup";
import RequireAuth from "./components/auth/RequireAuth";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import Bookmarks from "./pages/Bookmarks";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to={Paths.home} replace />} />
			<Route path={Paths.auth.login} element={<Login />} />
			<Route path={Paths.auth.signup} element={<SignUp />} />
			<Route element={<RequireAuth />}>
				<Route path={Paths.home} element={<Home />} />
				<Route path={Paths.explore} element={<Explore />} />
				<Route path={Paths.bookmarks} element={<Bookmarks />} />
				<Route path={Paths.profile} element={<Profile />} />
			</Route>
		</Routes>
	);
}

export default App;
