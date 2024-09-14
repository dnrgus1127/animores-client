import { useRecoilState } from "recoil";
import React, { useEffect, useState } from "react";
import { PetListAtom } from "../../../recoil/PetAtom";
import { IPetTypes } from "../../../../types/PetTypes";
import { PetService } from "../../../service/PetService";
import { View, Text, Pressable, StyleSheet } from "react-native";
import BottomModal from "../../../components/modal/BottomModal";

const PetListModal = (props: any) => {
    const { setUsePetListWindow, queryIdList, setClickedPetIds } = props;
    const [petList, setPetList] = useRecoilState<IPetTypes[]>(PetListAtom);
    useEffect(() => { 
      if(petList.length === 0) {
        PetService.pet.list().then((response) => {
          setPetList(response.data.data);
        });
      }
    }, []);

    const [pressedPetsId, setPressedPetsId] = useState<number[]>(queryIdList);
    const togglePetsIdsFunction = (id: number) => {
      if(pressedPetsId.includes(id)) {
        setPressedPetsId(pressedPetsId.filter((petId) => petId !== id));
      } else {
        setPressedPetsId([...pressedPetsId, id].sort()); 
      }
    };
    console.log(petList);
    const petListFooter = () => {
      return (
        <View>
          {petList.map((pet) => (
            <Pressable key={pet.id} onPress={() => togglePetsIdsFunction(pet.id)}>
              <View style={styles.container}>
                <Text>{pet.name}</Text>
                <Text>{pressedPetsId.includes(pet.id) ? 'V' : 'X'}</Text>
              </View>
            </Pressable>
          ))}
          <Pressable onPress={() => {
            setUsePetListWindow(false);
            setClickedPetIds(pressedPetsId);
          }}>
            <Text>Close</Text>
          </Pressable>
        </View>
      )
    };


  return (
    <BottomModal isVisible={true} footer={petListFooter} />
  );
};

export default PetListModal;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    modal: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 20,
        elevation: 5,
    },
    text: {
        color: 'black',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
    },
});