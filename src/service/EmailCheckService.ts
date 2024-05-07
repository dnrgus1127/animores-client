import AxiosContext from "../screens/context/AxiosContext";

export namespace EmailCheckService {
	export const Email = {
        check: async ({ email }: { email?: string }) => {
            try {
                const response = await AxiosContext.get(`/api/v1/account/check-email/${email}`)
				return { data: response.data, status: response.status };
            } catch (error) {
				console.error('EmailCheckService.Email.check:', error);
				return { data: null, status: error || 500 };
            }
        },
	}
}