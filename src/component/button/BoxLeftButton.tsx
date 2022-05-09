import { Button } from "@chakra-ui/react";
import { memo, FC, useCallback, Dispatch, SetStateAction } from "react";

import { ObjArrsType } from "../../page/TodoCardMain";

type Props = {
  allArr: ObjArrsType;
  setAllArr: Dispatch<SetStateAction<ObjArrsType>>;
  objIndex: number;
};

export const BoxLeftButton: FC<Props> = memo((props) => {
  const { allArr, setAllArr, objIndex } = props;

  const onLeftButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (allArr !== undefined) {
        //現状のboxと1つ下のboxを入れ替える
        const remove = allArr.splice(objIndex, 1);
        allArr.splice(objIndex - 1, 0, remove[0]);
        setAllArr([...allArr]);
      }
      e.currentTarget.blur();
    },
    [allArr]
  );

  return (
    <Button
      display={objIndex === 0 ? "none" : "block"}
      onClick={onLeftButton}
      variant="ghost"
      size={"sm"}
      m={0}
      p={0}
      _focus={{
        borderWidth: "0px",
        backgroundColor: "#ffffff",
      }}
      _active={{
        borderWidth: "0px",
        backgroundColor: "#ffffff",
      }}
      _hover={{ background: "ghost" }}
    >
      ⇦
    </Button>
  );
});
