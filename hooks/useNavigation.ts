import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParams } from "../types/RootStackParams";

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

export { useAppNavigation, useAppRoute };
