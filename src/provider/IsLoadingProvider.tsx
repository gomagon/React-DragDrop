import {
  useState,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

export type IsLoadingContextType = {
  useIsLoading: boolean;
  setUseIsLoading: Dispatch<SetStateAction<boolean>>;
};

export const IsLoadingContext = createContext<IsLoadingContextType>(
  {} as IsLoadingContextType
);

export const IsLoadingProvider = (props: { children: ReactNode }) => {
  const [useIsLoading, setUseIsLoading] = useState<boolean>(false);
  const { children } = props;

  return (
    <IsLoadingContext.Provider value={{ useIsLoading, setUseIsLoading }}>
      {children}
    </IsLoadingContext.Provider>
  );
};
