
import { Badge, Box, Flex, Text, Spinner } from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Todo } from "./Todolist";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

const BASE_URL = "http://localhost:5000/api";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const iconVariants = {
  initial: { scale: 1, filter: "drop-shadow(0 0 0px #fff)" },
  hover: { scale: 1.25, rotate: 15, filter: "drop-shadow(0 0 8px #38a169)" },
  tap: { scale: 0.95, rotate: -10, filter: "drop-shadow(0 0 12px #e53e3e)" }
};

const containerVariants = {
  initial: { y: 0 },
  animate: { y: [0, -8, 0], transition: { repeat: Infinity, duration: 1.2, ease: "easeInOut" } }
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const queryClient = useQueryClient();
  const { mutate: updateTodo, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTodo"],
    mutationFn: async (todo: Todo) => {
      if (todo.completed) {
        alert("Task already completed");
        return;
      }
      try {
        const res = await fetch(`${BASE_URL}/todos/${todo._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ completed: true })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to update todo");
        }
        return data;
      } catch (err) {
        console.log(err);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  const { mutate: deleteTodo, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTodo"],
    mutationFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/todos/${todo._id}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    }
  });

  return (
    <MotionFlex gap={2} alignItems={"center"} variants={containerVariants} initial="initial" animate="animate">
      <Flex
        flex={1}
        alignItems={"center"}
        border={"1px"}
        borderColor={"gray.600"}
        p={2}
        borderRadius={"lg"}
        justifyContent={"space-between"}
      >
        <Text
          color={todo.completed ? "green.200" : "yellow.100"}
          textDecoration={todo.completed ? "line-through" : "none"}
        >
          {todo.body}
        </Text>
        {todo.completed && (
          <Badge ml='1' colorScheme='green'>
            Done
          </Badge>
        )}
        {!todo.completed && (
          <Badge ml='1' colorScheme='yellow'>
            In Progress
          </Badge>
        )}
      </Flex>
      <Flex gap={2} alignItems={"center"}>
        <MotionBox
          color={"green.500"}
          cursor={"pointer"}
          variants={iconVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => updateTodo(todo)}
        >
          {!isUpdating && <FaCheckCircle size={25} />}
          {isUpdating && <Spinner size={"sm"} />}
        </MotionBox>
        <MotionBox
          color={"red.500"}
          cursor={"pointer"}
          variants={iconVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => deleteTodo()}
        >
          {!isDeleting && <MdDelete size={25} />}
          {isDeleting && <Spinner size={"sm"} />}
        </MotionBox>
      </Flex>
    </MotionFlex>
  );
};
export default TodoItem;