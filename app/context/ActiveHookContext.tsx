import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useState,
} from "react";

type ContextType = {
  active: string | null;
  setActiveHook: Dispatch<SetStateAction<string | null>>;
};

const defaultValue: ContextType = { active: null, setActiveHook: () => {} };

export const ActiveHookContext = createContext<ContextType>(defaultValue);

export const ActiveHookProvider = (props: PropsWithChildren) => {
  const [active, setActiveHook] = useState<string | null>(null);
  return (
    <ActiveHookContext.Provider value={{ active, setActiveHook }}>
      {props.children}
    </ActiveHookContext.Provider>
  );
};
