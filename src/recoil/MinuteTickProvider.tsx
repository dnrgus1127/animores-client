import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { minuteTickAtom } from "./MinuteTickAtom";

const MinuteTickProvider = () => {
  const setNow = useSetRecoilState(minuteTickAtom);

  useEffect(() => {
    const current = new Date();
    setNow(current);

    const msToNextMinute =
      (60 - current.getSeconds()) * 1000 - current.getMilliseconds();

    const timeout = setTimeout(() => {
      setNow(new Date());
      const interval = setInterval(() => {
        setNow(new Date());
      }, 60000);

      // 언마운트 시 정리
      return () => clearInterval(interval);
    }, msToNextMinute);

    return () => clearTimeout(timeout);
  }, [setNow]);

  return null; // UI를 렌더링하지 않음
};

export default MinuteTickProvider; 