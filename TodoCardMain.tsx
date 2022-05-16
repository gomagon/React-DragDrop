import { useCallback, useState, FC, memo } from "react";
import { Text, Spacer } from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { useIsLoadingProvider } from "../hooks/useIsLoadingProvider";
import { InitAllButton } from "../component/button/InitAllButton";
import { BoxAddButton } from "../component/button/BoxAddButton";
import { BoxDeleteButton } from "../component/button/BoxDeleteButton";
import { TodoDeleteButton } from "../component/button/TodoDeleteButton";
import { TodoAddInput } from "../component/input/TodoAddInput";
import { TodoTitleInput } from "../component/input/TodoTitleInput";
import { BoxLeftButton } from "../component/button/BoxLeftButton";
import { BoxRightButton } from "../component/button/BoxRightButton";

type ObjArrType = {
  id: string;
  draggableId: string;
  droppableId: string;
  title: string;
  todoArrs: todoType[];
  colorId: number;
};
type todoType = { id: string; draggableId: string; todo: string };
export type ObjArrsType = ObjArrType[];

const colors = [
  { text: "#385399", bg: "#eee" },
  { text: "#fff", bg: "#3e3e3e" },
  { text: "#fff", bg: "#e5652e" },
  { text: "#fff", bg: "#385399" },
  { text: "#fff", bg: "#66923d" },
];

export const TodoCardMain: FC = memo(() => {
  const [allArr, setAllArr] = useState<ObjArrsType>([]);
  const [isTitleEditClicked, setIsTitleEditClicked] = useState<number>(-1);
  const [editTitle, setEditTitle] = useState<string>("");
  const { setUseIsLoading } = useIsLoadingProvider();

  const onTodoClicked = useCallback(
    (objIndex: number) => {
      setIsTitleEditClicked(objIndex); //タイトルクリックで入力フィールドに移行させる
      allArr !== undefined && setEditTitle(allArr[objIndex].title); //入力フィールドに現在値を表示
    },
    [allArr]
  );

  const onBoxDragEndBox = useCallback(
    (result: any) => {
      console.log(result);

      const src_box_drop = result.source.droppableId;
      const dist_box_drop = result.destination.droppableId;
      const todo_drag = result.draggableId;
      const src_todo_index: number = result.source.index;
      const dist_todo_index: number = result.destination.index;

      if (src_box_drop !== dist_box_drop) {
        var boxindex = -1;
        allArr.map((box, index) => {
          if (box.droppableId === src_box_drop) boxindex = index;
          return box;
        });
        var boxtmp;
        var remove = [{ id: "0", draggableId: "0", todo: "0" }];
        boxtmp = allArr.splice(boxindex, 1); //boxからsrc削除
        remove = boxtmp[0].todoArrs.splice(src_todo_index, 1); //srcのtodo削除
        allArr.splice(boxindex, 0, boxtmp[0]); //boxに入れ直し。src完

        allArr.map((box, index) => {
          if (box.droppableId === dist_box_drop) {
            boxindex = index;
          }
          return box;
        });
        var boxtmp2 = allArr.splice(boxindex, 1); //boxからdist削除
        boxtmp2[0].todoArrs.splice(dist_todo_index, 0, remove[0]); //distにtodo追加
        allArr.splice(boxindex, 0, boxtmp2[0]);
      } else {
        var boxindex3 = -1;
        allArr.map((box, index) => {
          if (box.droppableId === src_box_drop) boxindex3 = index;
          return box;
        });
        var tmp_src: todoType[] = [];
        allArr[boxindex3].todoArrs.map((todo, index) => {
          if (todo.draggableId === todo_drag) {
            tmp_src.push(todo);
          }
        });
        var tmp3: todoType[] = [];
        allArr[boxindex3].todoArrs.map((todo, index) => {
          if (todo.draggableId !== todo_drag) {
            tmp3.push(todo);
          }
        });
        allArr[boxindex3].todoArrs = [...tmp3];
        allArr[boxindex3].todoArrs.splice(dist_todo_index, 0, tmp_src[0]);
      }
    },
    [allArr]
  );

  return (
    <div>
      <div
        style={{
          verticalAlign: "left",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginLeft: "16px",
        }}
      >
        <BoxAddButton allArr={allArr} setAllArr={setAllArr} />
        <InitAllButton setUseIsLoading={setUseIsLoading} setAllArr={setAllArr}>
          Init
        </InitAllButton>
      </div>
      <DragDropContext onDragEnd={onBoxDragEndBox}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {allArr?.map(
            (
              obj,
              objIndex //★map box★
            ) => (
              <div
                key={obj.id}
                style={{
                  position: "fixed",
                  top: "120px",
                  left: `${4 + objIndex * 220}px`,
                  backgroundColor: colors[obj.colorId].bg,
                  color: colors[obj.colorId].text,
                  marginTop: "16px",
                  marginLeft: "16px",
                  borderRadius: "6px",
                  width: "200px",
                  padding: "4px 10px 10px 10px",
                  transitionDuration: true ? "200ms" : "0ms",
                  opacity: 0.8,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <BoxLeftButton
                    allArr={allArr}
                    setAllArr={setAllArr}
                    objIndex={objIndex}
                  />
                  <BoxRightButton
                    allArr={allArr}
                    setAllArr={setAllArr}
                    objIndex={objIndex}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  {isTitleEditClicked === objIndex ? (
                    <TodoTitleInput
                      allArr={allArr}
                      setAllArr={setAllArr}
                      objIndex={objIndex}
                      setEditTitle={setEditTitle}
                      editTitle={editTitle}
                      setIsTitleEditClicked={setIsTitleEditClicked}
                    />
                  ) : (
                    <Text
                      onClick={() => onTodoClicked(objIndex)}
                      pl={1}
                      pt={2}
                      fontWeight="bold"
                      fontSize="lg"
                    >
                      {obj.title}
                    </Text>
                  )}
                  <Spacer />
                  <BoxDeleteButton
                    allArr={allArr}
                    setAllArr={setAllArr}
                    objIndex={objIndex}
                  >
                    ×
                  </BoxDeleteButton>
                </div>
                <TodoAddInput
                  allArr={allArr}
                  setAllArr={setAllArr}
                  objIndex={objIndex}
                />
                <Droppable droppableId={obj.droppableId}>
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {obj.todoArrs.map(
                        //★map todo
                        (val, valIndex) => (
                          <Draggable
                            key={val.id}
                            index={valIndex}
                            draggableId={val.draggableId}
                          >
                            {(provided) => (
                              <div
                                key={val.id}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <div
                                  style={{
                                    marginTop: "6px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Text
                                    bg={
                                      valIndex === 0
                                        ? "red.200"
                                        : valIndex === 1
                                        ? "blue.200"
                                        : "white"
                                    }
                                    color="blackAlpha.800"
                                    borderRadius={4}
                                    w={140}
                                    p={1}
                                    borderColor="gray.400"
                                    borderWidth={1}
                                    opacity="0.8"
                                  >
                                    {val.todo}
                                  </Text>
                                  <Spacer />
                                  <TodoDeleteButton
                                    allArr={allArr}
                                    setAllArr={setAllArr}
                                    objIndex={objIndex}
                                    valIndex={valIndex}
                                  />
                                </div>
                              </div>
                            )}
                          </Draggable>
                        )
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )
          )}
        </div>
      </DragDropContext>
    </div>
  );
});
