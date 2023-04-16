import React from "react";
import { Route, Routes } from "react-router-dom";
import { Paths } from "./routes";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/Home";

function App() {
	return (
		<Routes>
			<Route path={Paths.auth.signUp} element={<SignUp />} />
			<Route path={Paths.home} element={<Home />} />
		</Routes>
	);
}

export default App;
