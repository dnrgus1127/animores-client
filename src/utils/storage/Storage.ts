import AsyncStorage from "@react-native-async-storage/async-storage"

export const setTokens = async (accessToken: string, refreshToken: string) => {
	try {
		await AsyncStorage.setItem("accessToken", accessToken);
		await AsyncStorage.setItem("refreshToken", refreshToken);
	} catch (error) {
		console.error('setTokens error', error);
	}
}

export const getAccessToken = async () => {
	try {
		return await AsyncStorage.getItem('accessToken');
	} catch (error) {
		console.error('getAccessToken error', error);
		return null;
	}
}

export const getRefreshToken = async () => {
	try {
		return await AsyncStorage.getItem('refreshToken');
	} catch (error) {
		console.error('getRefreshToken error', error);
		return null;
	}
}

export const clearTokens = async () => {
	try {
		await AsyncStorage.removeItem("accessToken");
		await AsyncStorage.removeItem("refreshToken");
	} catch (error) {
		console.error('clearTokens error', error);
	}
}