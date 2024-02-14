import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import BasicInput from "../../components/BasicInput"
import BasicCheckbox from "../../components/BasicCheckbox";

const JoinScreen = () => {
  const [isChecked, setChecked] = useState(false)

  return (
    <View style={commonStyles.container}>
      <View style={styles.joinInputWrap}>
        <BasicInput placeholder='이메일' />
        <BasicInput placeholder='닉네임' />
        <BasicInput placeholder='비밀번호' secureTextEntry={true} />
        <BasicInput placeholder='비밀번호 확인' secureTextEntry={true} />
        <BasicInput placeholder='휴대 전화 번호 인증' />
        <BasicInput placeholder='인증번호' />
      </View>
      <View>
        <View>
          <Text style={{marginTop: 40}}>약관 동의</Text>
          <BasicCheckbox 
            isChecked={isChecked}
            onValueChangeHandler={() => setChecked(!isChecked)}
            label='전체 동의합니다.'
          />
          
          <View style={commonStyles.commonRowContainer}>
            <View style={[commonStyles.separator, {marginTop: 15}]} />
          </View>

          <BasicCheckbox 
            isChecked={isChecked}
            onValueChangeHandler={() => setChecked(!isChecked)}
            label='광고 수신동의(선택)'
          />
          <BasicCheckbox 
            isChecked={isChecked}
            onValueChangeHandler={() => setChecked(!isChecked)}
            label='이용 약관에 동의합니다.(필수)'
          />
          <BasicCheckbox 
            isChecked={isChecked}
            onValueChangeHandler={() => setChecked(!isChecked)}
            label='개인정보 수집 이용에 동의합니다.(필수)'
          />
        </View>
      </View>
      <Pressable
        onPress={() => console.log('Pressed')}
        style={styles.joinButton}
        children={<Text style={styles.joinButtonText}>회원가입</Text>}
      >
      </Pressable>
    </View>
  )
}

export default JoinScreen

const styles = StyleSheet.create({
  joinInputWrap: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  joinButton: {
    marginTop: 15,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FB3F7E',
  },
  joinButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});