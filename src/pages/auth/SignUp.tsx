import React, { useState } from "react";
import Layout from "../../components/auth/Layout";
import useSignup from "../../hooks/auth/useSignup";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../routes";
import { useForm } from "react-hook-form";
import { EmailAndPassword } from "../../hooks/auth/types";

const MININUM_PASSWORD_LENGTH = 6;
const EMAIL_IN_USE_MESSAGE = "Firebase: Error (auth/email-already-in-use).";

function SignUp() {
	const { register, handleSubmit } = useForm<EmailAndPassword>();

	const { mutate: signup, isLoading } = useSignup();
	const [errorMessage, setErrorMessage] = useState("");
	const [errorMessageIsShown, setErrorMessageIsShown] = useState(false);

	const navigate = useNavigate();

	async function onSignupFormSubmit(credentials: EmailAndPassword) {
		if (credentials.password.length < MININUM_PASSWORD_LENGTH) {
			displayError(`Password should be at least ${MININUM_PASSWORD_LENGTH} characters`);
			return;
		}

		signup(credentials, {
			onSuccess() {
				navigate(Paths.profileSetup, { replace: true });
			},
			onError(err: any) {
				if (err?.message === EMAIL_IN_USE_MESSAGE) displayError("Email Already exists");
				else displayError("An unexpected error occured");
			},
		});
	}

	function displayError(message: string) {
		setErrorMessage(message);
		setErrorMessageIsShown(true);
	}

	return (
		<Layout
			register={register}
			errorMessage={errorMessage}
			errorMessageIsShown={errorMessageIsShown}
			isLoading={isLoading}
			handleSubmit={handleSubmit(onSignupFormSubmit)}
		/>
	);
}

export default SignUp;
