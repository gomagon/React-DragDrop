import { Input } from "@chakra-ui/react";
import {
  memo,
  FC,
  useCallback,
  Dispatch,
  SetStateAction,
  useState,
  ChangeEvent,
} from "react";
import { v4 as uuid } from "uuid";

import { ObjArrsType } from "../../page/TodoCardMain";

type Props = {
  allArr: ObjArrsType;
  setAllArr: Dispatch<SetStateAction<ObjArrsType>>;
  objIndex: number;
};

export const TodoAddInput: FC<Props> = memo((props) => {
  const { allArr, setAllArr, objIndex } = props;
  const [editTodo, setEditTodo] = useState<string>("");

  const onTodoAddButton = useCallback(
    (value: string) => {
      if (allArr !== undefined) {
        const id = uuid();
        allArr[objIndex].todoArrs.push({
          id: id,
          draggableId: `drag${id}`,
          todo: value,
        });
        setAllArr([...allArr]);
        setEditTodo("");
      }
    },
    [allArr]
  );

  const onChangeTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setEditTodo(e.target.value);
  };

  return (
    <Input
      onChange={onChangeTodo}
      value={editTodo}
      onKeyDown={(e) => {
        e.key === "Enter" &&
          e.currentTarget.value !== "" &&
          onTodoAddButton(e.currentTarget.value);
      }}
      mt={4}
      w={180}
      placeholder="add todo"
      borderColor="gray.400"
      borderWidth={1}
    />
  );
});
