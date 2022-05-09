import { Button } from "@chakra-ui/react";
import { memo, FC, useCallback, Dispatch, SetStateAction } from "react";

import { ObjArrsType } from "../../page/TodoCardMain";

type Props = {
  allArr: ObjArrsType;
  setAllArr: Dispatch<SetStateAction<ObjArrsType>>;
  objIndex: number;
};

export const BoxDeleteButton: FC<Props> = memo((props) => {
  const { allArr, setAllArr, objIndex } = props;

  const onBoxDeleteButton = useCallback(() => {
    if (allArr !== undefined) {
      allArr.splice(objIndex, 1);
      setAllArr([...allArr]);
    }
  }, [allArr]);

  return (
    <Button
      onClick={onBoxDeleteButton}
      color="red"
      fontSize="lg"
      bgColor="white"
      _hover={{ background: "ghost" }}
    >
      ×
    </Button>
  );
});
