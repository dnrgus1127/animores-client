import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, ParamListBase, RouteProp, TabNavigationState } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import PngImage from '../assets/png';
import Title from '../components/text/Title';
import { ScreenName } from '../statics/constants/ScreenName';
import { Colors } from '../styles/Colors';

interface ITabBarProps {
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
    state: TabNavigationState<ParamListBase>;
}

const TabBar = ({ navigation, state }: ITabBarProps) => {

    const {
        todoBottomTab,
        calendarBottomTab,
        homeBottomTab,
        recordBottomTab,
        mypageBottomTab,
        todoBottomTabActive,
        calendarBottomTabActive,
        homeBottomTabActive,
        recordBottomTabActive,
        mypageBottomTabActive,
    } = PngImage.BottomTab;

    const getTitle = (tabName: string) => {
        switch (tabName) {
            case ScreenName.AllTodo: return '모든할일';
            case ScreenName.Calendar: return '캘린더';
            case ScreenName.Home: return '홈';
            case ScreenName.Record: return '일지';
            case ScreenName.Mypage: return 'MY';
            default: return '';
        }
    }

    const getIcon = (name: string, isFocused: boolean) => {
        switch (name) {
            case ScreenName.AllTodo:
                return isFocused
                    ? todoBottomTabActive
                    : todoBottomTab
            case ScreenName.Calendar:
                return isFocused
                    ? calendarBottomTabActive
                    : calendarBottomTab
            case ScreenName.Home:
                return isFocused
                    ? homeBottomTabActive
                    : homeBottomTab
            case ScreenName.Record:
                return isFocused
                    ? recordBottomTabActive
                    : recordBottomTab
            case ScreenName.Mypage:
                return isFocused
                    ? mypageBottomTabActive
                    : mypageBottomTab
        }
    }

    return (
        <View style={styles.Container}>
            {state.routes.map((route: RouteProp<ParamListBase>, index: number) => {
                const isFocused = state.index === index;
                const icon = getIcon(route.name, isFocused)

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }

                return (
                    <View
                        key={route.key}
                        style={isFocused ? styles.FocusedTab : null}>
                        <Pressable
                            onPress={onPress}
                            style={styles.pressable}>
                            <Image
                                source={icon}
                                style={styles.icon} />
                            <Title
                                text={getTitle(route.name)}
                                fontSize={10}
                                color={isFocused ? Colors.FB3F7E : Colors.Gray838383}
                                fontWeight={isFocused ? 'bold' : 'normal'}
                                style={{ textAlign: "center" }} />
                        </Pressable>
                    </View>
                )
            })}
        </View >
    );
};

export default TabBar;

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        paddingHorizontal: 28,
        paddingBottom: 12,
        justifyContent: "space-between",
        backgroundColor: Colors.White,
    },
    FocusedTab: {
        borderTopWidth: 2,
        borderTopColor: Colors.FB3F7E,
    },
    pressable: {
        alignItems: "center",
        paddingTop: 10,
    },
    icon: {
        width: 24,
        height: 24,
        marginBottom: 6,
    },
});