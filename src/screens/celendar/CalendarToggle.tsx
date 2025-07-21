import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../styles/Colors';
import { Shadow } from 'react-native-shadow-2';

type CalendarToggleProps = {
    selectedTab: 'todo' | 'diary';
    onTabChange: (tab: 'todo' | 'diary') => void;
    style?: object;
};

type ShadowButtonProps = {
    children: React.ReactNode;
    isSelected: boolean;
};

const ShadowButton: React.FC<ShadowButtonProps> = ({ children, isSelected }) => {
    if (!isSelected) {
        return <>{children}</>;
    }

    return (
        <Shadow
            distance={1}
            startColor={'rgba(128, 128, 128, 0.1)'}
            offset={[0, 0]}
            style={styles.shadowContainer}
        >
            {children}
        </Shadow>
    );
};

export const CalendarToggle: React.FC<CalendarToggleProps> = ({ selectedTab, onTabChange, style }) => {
    return (
        <View style={[styles.toggleContainer, style]}>
            <View style={styles.toggleBackground}>
                <ShadowButton isSelected={selectedTab === 'todo'}>
                    <Pressable
                        style={[styles.tab, selectedTab === 'todo' && styles.selectedTab]}
                        onPress={() => onTabChange('todo')}
                    >
                        <Text style={[styles.text, selectedTab === 'todo' ? styles.selectedText : styles.unselectedText]}>to do</Text>
                    </Pressable>
                </ShadowButton>
                <ShadowButton isSelected={selectedTab === 'diary'}>
                    <Pressable
                        style={[styles.tab, selectedTab === 'diary' && styles.selectedTab]}
                        onPress={() => onTabChange('diary')}
                    >
                        <Text style={[styles.text, selectedTab === 'diary' ? styles.selectedText : styles.unselectedText]}>일지</Text>
                    </Pressable>
                </ShadowButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    toggleContainer: {
        backgroundColor: Colors.White,
        alignItems: 'center',
        justifyContent: "center"
    },
    toggleBackground: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        padding: 2.5,
    },
    shadowContainer: {
        borderRadius: 20,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignItems: 'center',
        borderRadius: 20,
    },
    selectedTab: {
        backgroundColor: Colors.White,
    },
    text: {
        color: Colors.TextColor,
        fontFamily : "Pretendard-SemiBold",
        fontSize: 16,
    },
    selectedText: {
        color: Colors.Black,
    },
    unselectedText: {
        color: Colors.LightGery,
    },
}); 