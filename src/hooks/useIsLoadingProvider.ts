import { useContext } from "react";

import {
  IsLoadingContext,
  IsLoadingContextType,
} from "../provider/IsLoadingProvider";

export const useIsLoadingProvider = (): IsLoadingContextType => {
  return useContext(IsLoadingContext);
};
