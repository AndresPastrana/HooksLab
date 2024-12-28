import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

export type ActiveHook = {
  name: string;
  desc: string;
  code: string | null;
};

type ContextType = {
  active: ActiveHook | null;
  setActiveHook: Dispatch<SetStateAction<ActiveHook | null>>;
};

const defaultValue: ContextType = { active: null, setActiveHook: () => {} };

export const ActiveHookContext = createContext<ContextType>(defaultValue);

export const ActiveHookProvider = (props: PropsWithChildren) => {
  const [active, setActiveHook] = useState<ActiveHook | null>(null);

  return (
    <ActiveHookContext.Provider value={{ active, setActiveHook }}>
      {props.children}
    </ActiveHookContext.Provider>
  );
};
