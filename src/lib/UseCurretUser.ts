import { getAuth } from "firebase/auth";

const useCurrentUser = () => {
	const auth = getAuth();
	const user = auth.currentUser;
	if (user != null) {
		const email = user.email;
		const username = user.displayName;

		const userInfo = { email, username };
		return userInfo;
	} else {
		return user;
	}
};

export default useCurrentUser;
