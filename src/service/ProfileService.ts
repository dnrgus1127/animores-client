import AsyncStorage from "@react-native-async-storage/async-storage";
import AxiosContext from "../screens/context/AxiosContext";

export namespace ProfileService {
	export const profile = {
		list: async () => {
			try {
				const response = await AxiosContext.get(`/api/v1/profiles`);
				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('ProfileService.Profile.list:', error);
				return { data: null, status: error };
			}
		},
		create: async (formData: FormData) => {
			console.log('formData', formData);
			try{
				const response = await AxiosContext.post(`/api/v1/profiles`, formData, {
				  headers: {
					'Content-Type': 'multipart/form-data'
				  }
				});
				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('ProfileService.Profile.create:', error);
				return { data: null, status: error || error };
			}
		},
	}
}