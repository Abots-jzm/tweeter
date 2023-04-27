import { ChangeEvent, FormEvent, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { Paths } from "../../routes";
import LogoSVG from "../../assets/tweeter.svg";
import useGuestLogin from "../../hooks/auth/useGuestLogin";
import useGoogleLogin from "../../hooks/auth/useGoogleLogin";
import useGetUserProfile from "../../hooks/profile/useGetUserProfile";

type Props = {
	enteredEmail: string;
	enteredPassword: string;
	errorMessage: string;
	errorMessageIsShown: boolean;
	isLoading: boolean;
	nextPath?: string;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
	onEmailChange: (e: ChangeEvent<HTMLInputElement>) => void;
	onPasswordChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function Layout({
	enteredEmail,
	enteredPassword,
	errorMessage,
	errorMessageIsShown,
	isLoading,
	nextPath,
	handleSubmit,
	onEmailChange,
	onPasswordChange,
}: Props) {
	const location = useLocation();
	const navigate = useNavigate();
	const isLoginPage = location.pathname === Paths.auth.login;

	// const {data: userProfile} = useGetUserProfile();

	const { mutate: googleLogin, isLoading: googleIsLoading, isError: googleIsError } = useGoogleLogin();
	const [googleErrorMessage, setGoogleErrorMessage] = useState("");

	const { mutate: guestLogin, isLoading: guestIsLoading, isError: guestIsError } = useGuestLogin();
	const [guestErrorMessage, setGuestErrorMessage] = useState("");

	async function onGoogleSubmit() {
		googleLogin(undefined, {
			onSuccess() {
				navigate(nextPath || Paths.home, { replace: true });
			},
			onError() {
				setGoogleErrorMessage("An unexpected error occured");
			},
		});
	}

	async function onGuestSubmit() {
		guestLogin(undefined, {
			onSuccess() {
				navigate(nextPath || Paths.home, { replace: true });
				// navigate(Paths.profileSetup, { replace: true });
			},
			onError() {
				setGuestErrorMessage("An unexpected error occured");
			},
		});
	}

	return (
		<Container>
			<div>
				<LogoContainer>
					<img src={LogoSVG} alt="tweeter logo" />
				</LogoContainer>
				<SignupText>{isLoginPage ? "Login" : "Sign up"}</SignupText>
				<Form onSubmit={handleSubmit}>
					<div>
						<p>
							<MdEmail />
						</p>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							value={enteredEmail}
							onChange={onEmailChange}
							required
						/>
					</div>
					<div>
						<p>
							<IoMdLock />
						</p>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							value={enteredPassword}
							onChange={onPasswordChange}
							required
						/>
					</div>
					<LoginBtn type="submit">
						<div>{isLoginPage ? "Login" : "Sign up"}</div>
						{isLoading && <Spinner />}
					</LoginBtn>
				</Form>
				{errorMessageIsShown && <ErrorMessage>{errorMessage}</ErrorMessage>}
				<Others>
					<div>or</div>
					<OtherBtn onClick={onGoogleSubmit}>
						<div className="icon">
							<FaGoogle />
						</div>
						<span>continue with Google</span>
						{googleIsLoading && <SpinnerGray />}
					</OtherBtn>
					{googleIsError && <ErrorMessage>{googleErrorMessage}</ErrorMessage>}
					<OtherBtn onClick={onGuestSubmit}>
						<span>continue as a guest</span>
						{guestIsLoading && <SpinnerGray />}
					</OtherBtn>
					{guestIsError && <ErrorMessage>{guestErrorMessage}</ErrorMessage>}
					<div className="other-text">
						{isLoginPage && (
							<>
								Don't have an account yet? <LinkStyles to={Paths.auth.signup}>Register</LinkStyles>
							</>
						)}
						{!isLoginPage && (
							<>
								Already have an account? <LinkStyles to={Paths.auth.login}>Login</LinkStyles>
							</>
						)}
					</div>
				</Others>
			</div>
		</Container>
	);
}

export default Layout;

const LogoContainer = styled.div`
	height: 3rem;
	margin-bottom: 4rem;

	img {
		height: 100%;
		width: 100%;
		object-fit: contain;
		object-position: left;
	}
`;

const spinner = keyframes`
   100% {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	width: 2rem;
	height: 2rem;
	border-radius: 50%;
	border-left: 2px solid white;
	animation: ${spinner} 0.7s linear infinite;
`;

const SpinnerGray = styled(Spinner)`
	border-left: 1px solid #828282;
`;

const ErrorMessage = styled.div`
	font-size: 1.4rem;
	color: #ff414e;
	margin-top: 1rem;
	align-self: flex-start;
`;

const LinkStyles = styled(Link)`
	color: #2d9cdb;
	text-decoration: none;
`;

const Others = styled.div`
	margin-top: 1.8rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #828282;
	font-size: 1.4rem;

	.other-text {
		margin-top: 3.3rem;
	}
`;

const LoginBtn = styled.button`
	padding: 0.8rem;
	background-color: #2f80ed;
	color: white;
	border-radius: 8px;
	font-weight: 700;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 2rem;
`;

const OtherBtn = styled(LoginBtn)`
	margin-top: 1.8rem;
	border: 1px solid #828282;
	color: #828282;
	background-color: transparent;
	width: 100%;
	font-weight: 400;
	position: relative;

	.icon {
		position: absolute;
		left: 2rem;
		top: 1rem;
	}
`;

const Form = styled.form`
	margin-top: 2.5rem;
	display: flex;
	flex-direction: column;
	gap: 1.8rem;

	& > div {
		position: relative;
	}

	p {
		position: absolute;
		font-size: 2rem;
		top: 0.9rem;
		left: 1.4rem;
		color: #828282;
	}

	input {
		padding: 0.8rem;
		border-radius: 0.8rem;
		border: none;
		padding-left: 4.6rem;
		width: 100%;
		background-color: #f3f3f3;

		&::placeholder {
			color: #828282;
		}
	}
`;

const SignupText = styled.div`
	font-family: "Poppins", sans-serif;
	font-size: 1.8rem;
	font-weight: 600;
`;

const Container = styled.div`
	display: grid;
	place-items: center;
	width: 100vw;
	height: 100vh;
	background-color: #f2f2f2;

	& > div {
		padding: 4.8rem 5.8rem;
		border-radius: 0.8rem;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
		width: min(47.3rem, 100%);
		background-color: white;
	}

	@media only screen and (max-width: 473px) {
		place-items: start;
		padding-top: 5vh;
		background-color: inherit;

		& > div {
			box-shadow: none;
			padding: 2rem;
		}
	}
`;
