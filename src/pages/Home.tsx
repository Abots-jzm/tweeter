import React, { useState } from "react";
import styled from "styled-components";
import TweetSomething from "../components/tweets/TweetSomething";
import Tweet from "../components/tweets/Tweet";

function Home() {
	const [replyModalOpen, setReplyModalOpen] = useState(false);

	return (
		<Container>
			<div className="left">
				<TweetSomething replyModalOpen={replyModalOpen} setReplyModalOpen={setReplyModalOpen} />
				<TweetsContainer>
					<Tweet
						retweeted="Daniel Johnson"
						replies={true}
						image="https://images.immediate.co.uk/production/volatile/sites/30/2022/07/Black-beans-avocado-on-toast-d351aa6.jpg?quality=90&webp=true&fit=700,350"
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum omnis odit cupiditate molestiae ad hic
						consequatur eius quo dolor minus. In deserunt sunt architecto doloremque eius, fugiat recusandae ipsam eos.
					</Tweet>
				</TweetsContainer>
			</div>
			<div className="right">right</div>
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

const Container = styled.div`
	max-width: 110rem;
	margin: 0 auto;
	padding: 0 2rem;
	display: flex;
	gap: 2.5rem;

	& > .left {
		flex: 1;
	}

	& > .right {
		flex-basis: 30.6rem;

		@media only screen and (max-width: 900px) {
			display: none;
		}
	}
`;
