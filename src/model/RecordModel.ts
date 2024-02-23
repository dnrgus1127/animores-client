import { SvgProps } from "react-native-svg";

export namespace RecordModel {
	export interface IRecordModel {
		id: number;
		nickName: string;
		date: string;
		contents: string;
		image?: React.ReactElement<SvgProps>;
	}
}