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
		create: async (name: string, profileImage: string) => {
			console.log('name', name, 'profileImage', profileImage);
			try {
				const response = await AxiosContext.post(`/api/v1/profiles`,
					{ name, profileImage });
				console.log('response', response);
				return { data: response.data, status: response.status };
			} catch (error) {
				console.error('ProfileService.Profile.create:', error);
				return { data: null, status: error };
			}
		},
	}
}