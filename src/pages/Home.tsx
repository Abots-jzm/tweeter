import React, { useState } from "react";
import styled from "styled-components";
import TweetSomething from "../components/tweets/TweetSomething";
import Tweet from "../components/tweets/Tweet";
import Recommendation from "../components/tweets/Recommendation";

function Home() {
	const [replyModalOpen, setReplyModalOpen] = useState(false);

	return (
		<Container>
			<div className="left">
				<TweetSomething replyModalOpen={replyModalOpen} setReplyModalOpen={setReplyModalOpen} />
				<TweetsContainer>
					<Tweet
						retweeted="Daniel Johnson"
						image="https://images.immediate.co.uk/production/volatile/sites/30/2022/07/Black-beans-avocado-on-toast-d351aa6.jpg?quality=90&webp=true&fit=700,350"
						replies
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum omnis odit cupiditate molestiae ad hic
						consequatur eius quo dolor minus. In deserunt sunt architecto doloremque eius, fugiat recusandae ipsam eos.
					</Tweet>
				</TweetsContainer>
			</div>
			<div className="right">
				<Heading>Who to follow</Heading>
				<RecContainer>
					<Recommendation />
					<Recommendation />
					<Recommendation />
				</RecContainer>
			</div>
		</Container>
	);
}

export default Home;

const TweetsContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin: 2.4rem 0;
	gap: 2.4rem;
`;

const RecContainer = styled.div`
	display: flex;
	flex-direction: column;
`;

const Heading = styled.div`
	color: #4f4f4f;
	font-family: "Poppins", sans-serif;
	font-weight: 600;
	padding-bottom: 0.8rem;
	border-bottom: 1px solid #e0e0e0;
	font-size: 1.2rem;
	margin-bottom: 1.9rem;
`;

const Container = styled.div`
	max-width: 110rem;
	margin: 0 auto;
	padding: 2.5rem 2rem;
	display: flex;
	gap: 2.5rem;

	& > .left {
		flex: 1;
	}

	& > .right {
		align-self: flex-start;
		flex-basis: 30.6rem;
		padding: 1rem 2rem;
		background-color: #ffffff;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05);
		border-radius: 12px;

		@media only screen and (max-width: 900px) {
			display: none;
		}
	}
`;
