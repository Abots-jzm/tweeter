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
	imageUrl?: string;
	followers: string[];
	following: string[];
	likes: string[];
	retweets: RetweetType[];
	bookmarks: string[];
	impressionsIndex: number;
	replies: Reply[];
	isPublicReply: boolean;
};

export type RetweetType = {
	name: string;
	uid: string;
};

export type Reply = {
	displayName: string;
	uid: string;
	time: Timestamp;
	photoUrl?: string;
	content: string;
	likes: string[];
};

export type LikePayload = {
	tweetId: string;
	userId: string;
	action: "like" | "unlike";
};

export type FollowPayload = {
	personToFollowId: string;
	userId: string;
	action: "follow" | "unfollow";
};

export type BookmarkPayload = {
	tweetId: string;
	userId: string;
	action: "save" | "unsave";
};

export type RetweetPayload = {
	tweetId: string;
	userId: string;
	userDisplayName: string;
	action: "retweet" | "unretweet";
};

export type ReplyPayload = {
	tweetId: string;
	reply: Reply;
};
