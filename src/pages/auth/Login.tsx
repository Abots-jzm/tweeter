import React, { useState } from "react";
import Layout from "../../components/auth/Layout";
import useLogin from "../../hooks/auth/useLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../../routes";
import { useForm } from "react-hook-form";
import { EmailAndPassword } from "../../hooks/auth/types";

const WRONG_PASSWORD_MESSAGE = "Firebase: Error (auth/wrong-password).";
const USER_NOT_FOUND_MESSAGE = "Firebase: Error (auth/user-not-found).";

function Login() {
	const { register, handleSubmit } = useForm<EmailAndPassword>();

	const { mutate: login, isLoading, isError } = useLogin();
	const [errorMessage, setErrorMessage] = useState("");

	const location = useLocation();
	const prevPath = location.state?.from?.pathname;
	const nextPath = prevPath && prevPath !== Paths.auth.login && prevPath !== Paths.auth.signup ? prevPath : Paths.home;

	const navigate = useNavigate();

	function onLoginFormSubmit(credentials: EmailAndPassword) {
		login(credentials, {
			onSuccess() {
				navigate(Paths.home, { replace: true });
			},
			onError(err: any) {
				const credentialAreInvalid = err?.message === WRONG_PASSWORD_MESSAGE || err?.message === USER_NOT_FOUND_MESSAGE;
				if (credentialAreInvalid) setErrorMessage("Invalid Email or Password");
				else setErrorMessage("An unexpected error occured");
			},
		});
	}

	return (
		<Layout
			register={register}
			errorMessage={errorMessage}
			errorMessageIsShown={isError}
			isLoading={isLoading}
			nextPath={nextPath}
			handleSubmit={handleSubmit(onLoginFormSubmit)}
		/>
	);
}

export default Login;
