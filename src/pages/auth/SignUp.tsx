import React, { useState } from "react";
import Layout from "../../components/auth/Layout";
import useSignup from "../../hooks/auth/useSignup";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../routes";
import { useForm } from "react-hook-form";
import { EmailAndPassword } from "../../hooks/auth/types";

function SignUp() {
	const { register, handleSubmit } = useForm<EmailAndPassword>();
	const [errorMessage, setErrorMessage] = useState("");
	const [errorMessageIsShown, setErrorMessageIsShown] = useState(false);
	const { mutate: signup, isLoading } = useSignup();

	const navigate = useNavigate();

	async function onSubmit({ email, password }: EmailAndPassword) {
		if (password.length < 6) {
			setErrorMessage("Password should be at least 6 characters");
			setErrorMessageIsShown(true);
			return;
		}

		signup(
			{ email, password },
			{
				onSuccess() {
					navigate(Paths.profileSetup, { replace: true });
				},
				onError(err: any) {
					if (err?.message === "Firebase: Error (auth/email-already-in-use).") {
						setErrorMessage("Email Already exists");
						setErrorMessageIsShown(true);
					} else {
						setErrorMessage("An unexpected error occured");
						setErrorMessageIsShown(true);
					}
				},
			}
		);
	}

	return (
		<Layout
			register={register}
			errorMessage={errorMessage}
			errorMessageIsShown={errorMessageIsShown}
			isLoading={isLoading}
			handleSubmit={handleSubmit(onSubmit)}
		/>
	);
}

export default SignUp;
