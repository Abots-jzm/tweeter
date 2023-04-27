export type UpdateProfilePayload = {
	photo?: File;
	cover?: File;
	dispayName: string;
	bio: string;
	uid: string;
};

export type UserData = {
	displayName: string;
	bio: string;
	photoURL?: string;
	coverURL?: string;
};
