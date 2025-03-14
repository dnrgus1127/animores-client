import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../../types/RootStackParams";
import {RootStackParamList} from "../navigation/type";
import {ScreenName, StackName, StackNameKey} from "../statics/constants/ScreenName";

type RootStackNavigationProps = StackNavigationProp<RootStackParams>;
type RootStackRouteProps = RouteProp<RootStackParams>;

const useAppNavigation = () => {
  const navigation = useNavigation<RootStackNavigationProps>();

  return { navigation };
};

const useAppRoute = () => {
  const route = useRoute<RootStackRouteProps>();

  return { route };
};


function useNavigationParams<T extends StackNameKey | "", K extends T extends StackNameKey ? keyof RootStackParamList[T] : keyof RootStackParamList>() {
  type ParamList = T extends StackNameKey ? RootStackParamList[T] : RootStackParamList
  type RouteName = K;

  return useRoute<RouteProp<ParamList, RouteName & keyof ParamList>>().params!;
}

export {useAppNavigation, useAppRoute, useNavigationParams};