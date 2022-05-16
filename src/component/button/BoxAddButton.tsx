import { PlusSquareIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { memo, FC, useCallback, Dispatch, SetStateAction, useRef } from "react";

import { ObjArrsType } from "../../page/TodoCardMain";

type Props = {
  allArr: ObjArrsType;
  setAllArr: Dispatch<SetStateAction<ObjArrsType>>;
};

export const BoxAddButton: FC<Props> = memo((props) => {
  const { allArr, setAllArr } = props;
  var count = useRef(0);

  const onBoxAddButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (allArr !== undefined && allArr.length < 5) {
        allArr.push({
          id: `${count.current}`,
          draggableId: `drag${count.current}`,
          droppableId: `drop${count.current}`,
          title: `Title${count.current}`,
          todoArrs: [],
          colorId: count.current % 5,
        });
        setAllArr([...allArr]);
        e.currentTarget.blur();
        count.current++;
      }
    },
    [allArr]
  );

  return (
    <IconButton
      onClick={(e) => onBoxAddButton(e)}
      size="lg"
      my={4}
      borderRadius="full"
      icon={<PlusSquareIcon />}
      _hover={{ background: "ghost" }}
      aria-label="deleteBoxIcon"
      colorScheme="#666"
    />
  );
});
