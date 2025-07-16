import { atom, selector } from "recoil";

export const minuteTickAtom = atom<Date>({
  key: "minuteTickAtom",
  default: new Date(),
});

export const minuteTickSelector = selector<Date>({
  key: "minuteTickSelector",
  get: ({ get }) => get(minuteTickAtom),
}); 