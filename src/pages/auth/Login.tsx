import React, { useState } from "react";
import Layout from "../../components/auth/Layout";
import useLogin from "../../hooks/auth/useLogin";
import { useLocation, useNavigate } from "react-router-dom";
import { Paths } from "../../routes";
import { useForm } from "react-hook-form";
import { EmailAndPassword } from "../../hooks/auth/types";

function Login() {
	const { register, handleSubmit } = useForm<EmailAndPassword>();

	const { mutate: login, isLoading, isError } = useLogin();
	const [errorMessage, setErrorMessage] = useState("");

	const location = useLocation();
	const prevPath = location.state?.from?.pathname;
	const nextPath = prevPath && prevPath !== Paths.auth.login && prevPath !== Paths.auth.signup ? prevPath : Paths.home;

	const navigate = useNavigate();

	function onSubmit({ email, password }: EmailAndPassword) {
		login(
			{ email, password },
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
			register={register}
			errorMessage={errorMessage}
			errorMessageIsShown={isError}
			isLoading={isLoading}
			nextPath={nextPath}
			handleSubmit={handleSubmit(onSubmit)}
		/>
	);
}

export default Login;
