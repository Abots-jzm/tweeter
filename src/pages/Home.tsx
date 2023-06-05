import React, { useState } from "react";
import TweetSomething from "../components/tweets/TweetSomething";
import Tweet from "../components/tweets/Tweet";
import Person from "../components/tweets/Person";

function Home() {
	const [replyModalOpen, setReplyModalOpen] = useState(false);

	return (
		<div className="mx-auto my-0 flex max-w-[1100px] gap-6 px-5 py-6">
			<div className="flex-1">
				<TweetSomething replyModalOpen={replyModalOpen} setReplyModalOpen={setReplyModalOpen} />
				<div className="mt-6 block w-full self-start rounded-xl bg-white px-2.5 py-5 shadow-soft lg:hidden">
					<Person truncate />
					<Person truncate />
				</div>
				<div className="my-6 flex flex-col gap-6">
					<Tweet
						retweeted="Daniel Johnson"
						image="https://images.immediate.co.uk/production/volatile/sites/30/2022/07/Black-beans-avocado-on-toast-d351aa6.jpg?quality=90&webp=true&fit=700,350"
						replies
					>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum omnis odit cupiditate molestiae ad hic
						consequatur eius quo dolor minus. In deserunt sunt architecto doloremque eius, fugiat recusandae ipsam eos.
					</Tweet>
				</div>
			</div>
			<div className="hidden basis-[306px] self-start rounded-xl bg-white px-5 py-3.5 shadow-soft lg:block">
				<p className="mb-5 border-b border-b-[#e0e0e0] pb-2 font-poppins text-xs font-semibold text-[#4f4f4f]">
					Who to follow
				</p>
				<div className="flex flex-col">
					<Person truncate />
					<Person truncate />
					<Person truncate />
				</div>
			</div>
		</div>
	);
}

export default Home;
