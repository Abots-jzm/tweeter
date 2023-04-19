import React, { FormEvent, useState } from "react";
import Layout from "../../components/auth/Layout";
import useLogin from "../../hooks/auth/useLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../../routes";

function Login() {
	const [enteredEmail, setEnteredEmail] = useState("");
	const [enteredPassword, setEnteredPassword] = useState("");

	const { mutate: login, isLoading, isError } = useLogin();
	const [errorMessage, setErrorMessage] = useState("");

	const location = useLocation();
	const prevPath = location.state?.from?.pathname;
	const nextPath = prevPath && prevPath !== Paths.auth.login && prevPath !== Paths.auth.signup ? prevPath : Paths.home;

	const navigate = useNavigate();

	function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		login(
			{
				email: enteredEmail,
				password: enteredPassword,
			},
			{
				onSuccess() {
					navigate(Paths.home, { replace: true });
				},
				onError(err: any) {
					console.log(err.message);
					if (
						err?.message === "Firebase: Error (auth/wrong-password)." ||
						err?.message === "Firebase: Error (auth/user-not-found)."
					)
						setErrorMessage("Invalid Email or Password");
					else setErrorMessage("An unexpected error occured");
				},
			}
		);
	}

	return (
		<Layout
			enteredEmail={enteredEmail}
			enteredPassword={enteredPassword}
			errorMessage={errorMessage}
			errorMessageIsShown={isError}
			isLoading={isLoading}
			nextPath={nextPath}
			handleSubmit={handleSubmit}
			onEmailChange={(e) => setEnteredEmail(e.target.value)}
			onPasswordChange={(e) => setEnteredPassword(e.target.value)}
		/>
	);
}

export default Login;
