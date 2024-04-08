import React, { ChangeEvent, useEffect, useState } from "react";
import { View, StyleSheet, Text, GestureResponderEvent } from "react-native";
import { commonStyles } from "../../styles/commonStyles";
import BasicCheckbox from "../../components/BasicCheckbox";
import { Colors } from "../../styles/Colors";


interface IProps {
  checkedAgreements: (value:string[], valid:boolean) => void
}

const AgreementOnterms = (props: IProps) => {
  const { checkedAgreements } = props
  
  const [checkItems, setCheckItems] = useState<string[]>([])
  const [allChecked, setAllChecked] = useState<boolean>(false)

  const agreementList = [
    {
      id: 'receiveAdvertising',
      label: '광고 수신동의(선택)',
      required: false
    },
    {
      id: 'termsOfUse',
      label: '이용 약관에 동의합니다.(필수)',
      required: true
    },
    {
      id: 'privacyPolicy',
      label: '개인정보 수집 이용에 동의합니다.(필수)',
      required: true
    }
  ]

  
  useEffect(() => {
    const requiredLength = agreementList.filter((item) => item.required)
    let checkedRequired = requiredLength.filter((item) => checkItems.includes(item.id)).length

    if (checkedRequired === requiredLength.length) {
      checkedAgreements([...checkItems], true)
    } else {
      checkedAgreements([...checkItems], false)
    }
  }, [checkItems])

  // 약관 동의 체크 시
  const checkItemHandler = (id:string, isChecked:boolean) => {

    if (!isChecked) {
      setCheckItems([...checkItems, id])

      if (checkItems.length === agreementList.length - 1) {
        setAllChecked(true)
      }
    } else {
      setCheckItems(checkItems.filter((item) => item !== id))
      setAllChecked(false)
    }
  }

  // 약관 전체 동의 체크 시
  const allCheckedHandler = () => {
    setAllChecked(!allChecked)

    if (!allChecked) { 
      setCheckItems(agreementList.map((item) => item.id))
    } else {
      setCheckItems([])
    }
  }

  return (
    <View style={{ marginTop: 40 }}>
      <Text style={styles.label}>약관 동의</Text>
      <BasicCheckbox
        isChecked={allChecked}
        onValueChangeHandler={() => allCheckedHandler()}
        label='전체 동의합니다.'
      />
      
      <View style={commonStyles.commonRowContainer}>
        <View style={[commonStyles.separator, {marginTop: 15}]} />
      </View>

      {agreementList.map((item) => (
        <BasicCheckbox 
          key={item.id}
          isChecked={checkItems.includes(item.id)}
          onValueChangeHandler={() => checkItemHandler(item.id, checkItems.includes(item.id))}
          label={item.label}
        />
      ))}
    </View>
  )
}

export default AgreementOnterms

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: Colors.White,
  },
  joinInputWrap: {
    flexDirection: 'row', 
    alignItems: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputButton: {
    backgroundColor: '#F2F2F2', 
    padding: 12, 
    borderRadius: 5, 
    marginStart: 10, 
    width: 104, 
    alignItems: 'center',
  },
  disabled: {
    color: '#AEAEAE',
  },
  primaryButton: {
    marginTop: 64,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#FB3F7E',
  },
  primaryLargeButton: {
    marginTop: 64,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#FB3F7E',
  },
  primaryButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  secureEyeButton: {
    position: 'absolute',
    right: 0,
    bottom: 15
  },
  errorText: {
    color: '#FF4040',
  },
  successText: {
    color: '#00B01C',
  }
});