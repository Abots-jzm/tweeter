import { FormEvent, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoSVG from "../../assets/tweeter.svg";
import { EmailAndPassword } from "../../hooks/auth/types";
import useGoogleLogin from "../../hooks/auth/useGoogleLogin";
import useGuestLogin from "../../hooks/auth/useGuestLogin";
import { Paths } from "../../routes";

type Props = {
	register: UseFormRegister<EmailAndPassword>;
	errorMessage: string;
	errorMessageIsShown: boolean;
	isLoading: boolean;
	nextPath?: string;
	handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

function Layout({ register, errorMessage, errorMessageIsShown, isLoading, nextPath, handleSubmit }: Props) {
	const location = useLocation();
	const navigate = useNavigate();
	const isLoginPage = location.pathname === Paths.auth.login;

	const { mutate: googleLogin, isLoading: googleIsLoading, isError: googleIsError } = useGoogleLogin();
	const [googleErrorMessage, setGoogleErrorMessage] = useState("");

	const { mutate: guestLogin, isLoading: guestIsLoading, isError: guestIsError } = useGuestLogin();
	const [guestErrorMessage, setGuestErrorMessage] = useState("");

	async function onGoogleSubmit() {
		googleLogin(undefined, {
			onSuccess({ user }) {
				const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

				if (isNewUser) navigate(Paths.profileSetup);
				else navigate(nextPath || Paths.home, { replace: true });
			},
			onError() {
				setGoogleErrorMessage("An unexpected error occured");
			},
		});
	}

	async function onGuestSubmit() {
		guestLogin(undefined, {
			onSuccess({ user }) {
				const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;

				if (isNewUser) navigate(Paths.profileSetup);
				else navigate(nextPath || Paths.home, { replace: true });
			},
			onError() {
				setGuestErrorMessage("An unexpected error occured");
			},
		});
	}

	return (
		<div className="grid h-screen w-screen place-items-center items-start bg-inherit pt-[5vh] sm:items-center sm:bg-offWhite sm:pt-0">
			<div className="w-full max-w-[473px] rounded-lg bg-white px-[58px] pt-5 sm:pb-12 sm:pt-12 sm:shadow-soft">
				<div className="mb-10 h-[30px]">
					<img className="h-full w-full object-contain object-left" src={LogoSVG} alt="tweeter logo" />
				</div>
				<div className="font-poppins text-lg font-semibold">{isLoginPage ? "Login" : "Sign up"}</div>
				<form className="mt-[25px] flex flex-col gap-[18px]" onSubmit={handleSubmit}>
					<div className="relative">
						<p className="absolute left-[14px] top-[9px] text-[20px] text-ash">
							<MdEmail />
						</p>
						<input
							className="w-full rounded-lg border-none bg-offWhite2 p-2 pl-[46px] placeholder:text-ash"
							{...register("email")}
							type="email"
							id="email"
							placeholder="Email"
							required
						/>
					</div>
					<div className="relative">
						<p className="absolute left-[14px] top-[9px] text-[20px] text-ash">
							<IoMdLock />
						</p>
						<input
							className="w-full rounded-lg border-none bg-offWhite2 p-2 pl-[46px] placeholder:text-ash"
							{...register("password")}
							type="password"
							id="password"
							placeholder="Password"
							required
						/>
					</div>
					<button className="login-btn" type="submit">
						<div>{isLoginPage ? "Login" : "Sign up"}</div>
						{isLoading && <div className="spinner" />}
					</button>
				</form>
				{errorMessageIsShown && <div className="error-message">{errorMessage}</div>}
				<div className="mt-[18px] flex flex-col items-center text-sm text-ash">
					<div>or</div>
					<button
						className="login-btn relative mt-[18px] w-full border border-ash bg-transparent font-normal text-ash"
						onClick={onGoogleSubmit}
					>
						<div className="absolute left-5 top-[10px]">
							<FaGoogle />
						</div>
						<span>continue with Google</span>
						{googleIsLoading && <div className="spinner border-ash" />}
					</button>
					{googleIsError && <div className="error-message">{googleErrorMessage}</div>}
					<button
						className="login-btn relative mt-[18px] w-full border border-ash bg-transparent font-normal text-ash"
						onClick={onGuestSubmit}
					>
						<span>continue as a guest</span>
						{guestIsLoading && <div className="spinner border-ash" />}
					</button>
					{guestIsError && <div className="error-message">{guestErrorMessage}</div>}
					<div className="mt-[33px]">
						{isLoginPage && (
							<>
								Don't have an account yet?{" "}
								<Link className="text-secondaryBlue no-underline" to={Paths.auth.signup}>
									Register
								</Link>
							</>
						)}
						{!isLoginPage && (
							<>
								Already have an account?{" "}
								<Link className="text-secondaryBlue no-underline" to={Paths.auth.login}>
									Login
								</Link>
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Layout;
