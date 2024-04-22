import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

interface IProps {
  afterCountdown: () => void
  resetCount: boolean
}

const Countdown = (props:IProps) => {
  const { afterCountdown, resetCount } = props

  const [minutes, setMinutes] = useState(3)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if(resetCount){
      setMinutes(3)
      setSeconds(0)
    }
  }, [resetCount])

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown)
          afterCountdown()
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000);
    return () => clearInterval(countdown)
  }, [minutes, seconds])

  return (
    <View>
      <Text style={{ color: '#717171' }}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </Text>
    </View>
  );
}

export default Countdown
