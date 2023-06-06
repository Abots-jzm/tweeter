import { Timestamp } from "firebase/firestore";
import { UserData } from "../profile/types";

export type TweetPayload = {
	user: UserData;
	uid: string;
	time: Timestamp;
	content: string;
	image?: File;
	isPublicReply: boolean;
};

export type Tweet = {
	id: string;
	uid: string;
	displayName: string;
	photoUrl: string;
	time: Timestamp;
	content: string;
	tweetIndex: number;
	imageUrl?: string;
	imageIndex?: number;
	followers: string[];
	following: string[];
	likes: string[];
	retweets: string[];
	bookmarks: string[];
	replies: Reply[];
	retweeted: boolean;
	isPublicReply: boolean;
};

export type Reply = {
	displayName: string;
	uid: string;
	time: Timestamp;
	photoUrl: string;
	content: string;
	likes: string[];
};
