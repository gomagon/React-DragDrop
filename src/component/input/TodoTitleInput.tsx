import { Input } from "@chakra-ui/react";
import {
  memo,
  FC,
  useCallback,
  Dispatch,
  SetStateAction,
  ChangeEvent,
} from "react";

import { ObjArrsType } from "../../page/TodoCardMain";

type Props = {
  allArr: ObjArrsType;
  setAllArr: Dispatch<SetStateAction<ObjArrsType>>;
  objIndex: number;
  setIsTitleEditClicked: Dispatch<SetStateAction<number>>;
  editTitle: string;
  setEditTitle: Dispatch<SetStateAction<string>>;
};

export const TodoTitleInput: FC<Props> = memo((props) => {
  const {
    allArr,
    setAllArr,
    objIndex,
    setIsTitleEditClicked,
    editTitle,
    setEditTitle,
  } = props;

  const onTitleEntered = useCallback(
    (value: string) => {
      if (allArr !== undefined) {
        allArr[objIndex].title = value;
        setAllArr([...allArr]);
        setIsTitleEditClicked(-1);
      }
    },
    [allArr]
  );

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value);
  };

  return (
    <Input
      value={editTitle}
      onChange={onChangeTitle}
      onKeyDown={(e) => {
        e.key === "Enter" &&
          e.currentTarget.value !== "" &&
          onTitleEntered(e.currentTarget.value);
      }}
      onBlur={(e) => {
        e.currentTarget.value !== "" && onTitleEntered(e.currentTarget.value);
      }}
      autoFocus
      mt={1}
      w={140}
      placeholder="title"
    />
  );
});
