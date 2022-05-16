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
            colorId: 0,
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
      bg="#666"
      borderColor="#666"
      my={4}
      ml={4}
      borderWidth={2}
      borderRadius={6}
      transition="all .6s"
      opacity="0.7"
      _hover={{
        color: "#3e3e3e",
        bg: "white",
        borderColor: "#3e3e3e",
        opacity: 0.5,
      }}
    >
      Init
    </Button>
  );
});
