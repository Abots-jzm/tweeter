import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import Tweet from "../components/tweets/Tweet";
import { useSearchParams } from "react-router-dom";

type Tab = "tweet" | "replies" | "media" | "likes";

function Bookmarks() {
	const [searchParams, setSearchParams] = useSearchParams({ filter: "tweet" });
	const activeTab = searchParams.get("filter") as Tab;

	return (
		<Container>
			<Navigation>
				<div onClick={() => setSearchParams({ filter: "tweet" })}>
					{activeTab === "tweet" ? <ActiveBar layoutId="bookmarksNav" /> : <Bar />}
					<span>Tweets</span>
				</div>
				<div onClick={() => setSearchParams({ filter: "replies" })}>
					{activeTab === "replies" ? <ActiveBar layoutId="bookmarksNav" /> : <Bar />}
					<span>Tweets & replies</span>
				</div>
				<div onClick={() => setSearchParams({ filter: "media" })}>
					{activeTab === "media" ? <ActiveBar layoutId="bookmarksNav" /> : <Bar />}
					<span>Media</span>
				</div>
				<div onClick={() => setSearchParams({ filter: "likes" })}>
					{activeTab === "likes" ? <ActiveBar layoutId="bookmarksNav" /> : <Bar />}
					<span>Likes</span>
				</div>
			</Navigation>
			<div className="right">
				<TweetsContainer>
					<Tweet
						image="https://images.immediate.co.uk/production/volatile/sites/30/2022/07/Black-beans-avocado-on-toast-d351aa6.jpg?quality=90&webp=true&fit=700,350"
						replies
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum omnis odit cupiditate molestiae ad hic
						consequatur eius quo dolor minus. In deserunt sunt architecto doloremque eius, fugiat recusandae ipsam eos.
					</Tweet>
				</TweetsContainer>
			</div>
		</Container>
	);
}

export default Bookmarks;

const TweetsContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2.4rem;
	gap: 2.4rem;
`;

const Bar = styled(motion.div)`
	background-color: transparent;
	align-self: stretch;
	width: 0.3rem;
	height: 3.2rem;
`;

const ActiveBar = styled(Bar)`
	background-color: #2f80ed;
	border-radius: 0px 4px 4px 0px;
`;

const Navigation = styled.div`
	align-self: flex-start;
	flex-basis: 30.6rem;
	padding: 2rem 0;
	color: #828282;
	font-family: "Poppins", sans-serif;
	font-weight: 600;
	font-size: 1.4rem;
	background-color: #ffffff;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
	border-radius: 8px;
	display: flex;
	gap: 1.2rem;
	flex-direction: column;

	& > div {
		display: flex;
		gap: 1.7rem;
		align-items: center;
		cursor: pointer;
	}

	@media only screen and (max-width: 900px) {
		align-self: stretch;
		flex-basis: auto;
	}
`;

const Container = styled.div`
	max-width: 110rem;
	margin: 0 auto;
	padding: 2.5rem 2rem;
	display: flex;
	gap: 2.5rem;

	& > .right {
		flex: 1;
	}

	@media only screen and (max-width: 900px) {
		flex-direction: column;
	}
`;
