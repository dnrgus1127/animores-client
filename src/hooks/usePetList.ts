import { useQuery } from "@tanstack/react-query";
import { IPet } from "../../types/PetTypes";
import { QueryKey } from "../statics/constants/Querykey";
import { PetService } from "../service/PetService";

/**
 * petList를 관리하는 커스텀 훅
 * tanstack query를 사용하여 캐싱, 에러 처리, 로딩 상태 등을 제공합니다.
 */
export const usePetList = () => {
  const { 
    data: petList = [], 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery<IPet[]>(
    [QueryKey.PET_LIST],
    () => PetService.get.petList(),
    {
      staleTime: 5 * 60 * 1000, // 5분간 fresh로 유지
      cacheTime: 10 * 60 * 1000, // 10분간 캐시 유지
    }
  );

  return { 
    petList, 
    isLoading, 
    isError, 
    error, 
    refetch 
  };
}; 