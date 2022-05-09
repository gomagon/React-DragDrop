import { DeleteIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { memo, FC, useCallback, Dispatch, SetStateAction } from "react";

import { ObjArrsType } from "../../page/TodoCardMain"

type Props = {
    allArr: ObjArrsType;
    setAllArr: Dispatch<SetStateAction<ObjArrsType>>;
    objIndex: number
    valIndex: number
}

export const TodoDeleteButton: FC<Props> = memo((props) => {
    const {allArr, setAllArr, objIndex, valIndex} = props;

    const onTodoDeleteButton = useCallback(() => {
        if(allArr !== undefined) {
          allArr[objIndex].todoArrs.splice(valIndex, 1);
          setAllArr([...allArr]);
        }
      }, [allArr]);

  return (
    <IconButton
        onClick={onTodoDeleteButton}
        key={valIndex}
        icon={<DeleteIcon />}
        variant="ghost"
        _hover={{background:"ghost"}}
        aria-label="deleteTodoIcon"
    />
  );
})