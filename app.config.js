// 앱 설정을 환경변수 기반으로 구성하기 위해 동적 구성 파일을 사용합니다.
// .env 파일은 이미 .gitignore에 포함되어 있어 민감정보가 저장소에 업로드되지 않습니다.

require('dotenv').config();

module.exports = ({ config }) => {
	const baseUrl = process.env.EXPO_PUBLIC_BASE_URL || '';
	let exceptionDomain;
	try {
		exceptionDomain = baseUrl ? new URL(baseUrl).hostname : undefined;
	} catch (_) {
		exceptionDomain = undefined;
	}

	return {
		...config,
		jsEngine: 'hermes',
		name: 'PetMillyApp',
		slug: 'petmilly-app',
		version: '1.0.0',
		orientation: 'portrait',
		splash: {
			image: './src/assets/images/splash.png',
			resizeMode: 'contain',
			backgroundColor: '#E84178',
		},
		android: {
			googleServicesFile: './google-services.json',
			package: 'com.petmilly.application',
			permissions: ['android.permission.INTERNET'],
			jsEngine: 'hermes',
		},
		ios: {
			bundleIdentifier: 'com.petmilly.application',
			googleServicesFile: './GoogleService-Info.plist',
			infoPlist: {
				ITSAppUsesNonExemptEncryption: false,
				NSAppTransportSecurity: {
					NSAllowsArbitraryLoads: false,
					NSExceptionDomains: exceptionDomain
						? {
								[exceptionDomain]: {
									NSIncludesSubdomains: true,
									NSExceptionAllowsInsecureHTTPLoads: true,
								},
							}
						: {},
				},
			},
		},
		extra: {
			IMAGE_BASE_URL: process.env.IMAGE_BASE_URL,
			GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
			KAKAO_APP_KEY: process.env.KAKAO_APP_KEY,
			FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
			FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
			FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
			FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
			FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
			FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
			FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
		},
		scheme: 'com.petmilly.app',
		plugins: [
			'expo-dev-client',
			'@react-native-google-signin/google-signin',
			[
				'@react-native-seoul/kakao-login',
				{
					kakaoAppKey: process.env.KAKAO_APP_KEY,
					kotlinVersion: '1.9.0',
				},
			],
			[
				'expo-build-properties',
				{
					android: {
						extraMavenRepos: [
							'https://devrepo.kakao.com/nexus/content/groups/public/',
						],
					},
					ios: {
						useFrameworks: 'static',
					},
				},
			],
			'@react-native-firebase/app',
			'@react-native-firebase/auth',
		],
	};
};
