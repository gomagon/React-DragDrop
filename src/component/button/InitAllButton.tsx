import { Button } from "@chakra-ui/react";
import { memo, FC, useCallback, Dispatch, SetStateAction } from "react";

import { ObjArrsType } from "../../page/TodoCardMain";

type Props = {
  setUseIsLoading: Dispatch<SetStateAction<boolean>>;
  setAllArr: Dispatch<SetStateAction<ObjArrsType>>;
};

export const InitAllButton: FC<Props> = memo((props) => {
  const { setUseIsLoading, setAllArr } = props;

  const initAllButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      setUseIsLoading(true);
      setAllArr([
        ...[
          {
            id: "0",
            draggableId: "drag0",
            droppableId: "drop0",
            title: "default",
            todoArrs: [],
          },
        ],
      ]);
      e.currentTarget.blur();
      setTimeout(() => {
        setUseIsLoading(false);
      }, 1 * 1000);
    },
    [setUseIsLoading, setAllArr]
  );

  return (
    <Button
      onClick={initAllButton}
      size="lg"
      color="white"
      bg="rgb(50,196,233)"
      borderColor="rgb(50,196,233)"
      borderWidth={2}
      borderRadius={6}
      transition="all .6s"
      _hover={{
        color: "rgb(50,196,233)",
        bg: "white",
        borderColor: "rgb(50,196,233)",
      }}
    >
      Init
    </Button>
  );
});
