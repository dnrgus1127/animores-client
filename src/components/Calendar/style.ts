// WARNING 값 변경해도 리렌더링 없어서 핫 리로딩으로는 변경 사항이 보이지 않음. 인위적인 리렌더링 필요
import { Colors } from "../../styles/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');


export const CALENDAR_THEME = {
    todayBackgroundColor: Colors.Pink,
    'stylesheet.calendar.header': {
        week: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        dayHeader: {
            marginTop: 2,
            marginBottom: 7,
            width: 32,
            textAlign: 'center',
            fontSize: 14,
        },
    },
    'stylesheet.day.basic': {
        base: {
            padding: 0,
            margin: 0,
            height: 0,
            backgroundColor: Colors.Warning
        },
    },
    'stylesheet.calendar.main': {
        dayContainer: {
            width: width / 7,
            borderTopWidth: 1,
            borderColor: Colors.DBDBDB,
        },
        week: {
            flexDirection: "row",
            justifyContent: 'space-around',
            flex: 1
        },
        monthView: {
            flex: 1,
        },

    },
    'stylesheet.header': {
        week: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        }
    }

}

const base = StyleSheet.create({
    circle: {
        borderRadius: 50,
        paddingHorizontal: 6
    }
})

export const dayStyle = StyleSheet.create({
    select: {
        backgroundColor: Colors.Black,
        color: Colors.White,
        ...base.circle
    },
    today: {
        backgroundColor: Colors.Black,
        color: Colors.White,
        fontWeight: "bold",
        ...base.circle
    },
    default: {
        padding: 5,
    },
    disabled: {
        color: Colors.LightGery
    },
    sunday: {
        color: Colors.FF4040
    }
})
