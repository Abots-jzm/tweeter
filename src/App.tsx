import React from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "./routes";
import Login from "./pages/auth/Login";
import Home from "./pages/Home";
import SignUp from "./pages/auth/Signup";
import RequireAuth from "./components/auth/RequireAuth";

function App() {
	return (
		<Routes>
			<Route path={Paths.auth.login} element={<Login />} />
			<Route path={Paths.auth.signup} element={<SignUp />} />
			<Route element={<RequireAuth />}>
				<Route path={Paths.home} element={<Home />} />
			</Route>
		</Routes>
	);
}

export default App;
