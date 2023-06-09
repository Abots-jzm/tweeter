export type UpdateProfilePayload = {
	photo?: File;
	cover?: File;
	displayName: string;
	bio: string;
	uid: string;
	tweetIndex: number;
	imageIndex: number;
	followers: string[];
	following: string[];
	previousDisplayName?: string;
};

export type UserData = {
	userId: string;
	displayName: string;
	bio: string;
	photoURL?: string;
	coverURL?: string;
	tweetIndex: number;
	imageIndex: number;
	followers: string[];
	following: string[];
};
