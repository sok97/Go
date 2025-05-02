import { Flex, Spinner, Stack, Text, Box } from "@chakra-ui/react";
import TodoItem from "./TodoItem";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

export type Todo = {
  _id: number;
  body: string;
  completed: boolean;
};

const MotionStack = motion(Stack);
const MotionText = motion(Text);
const MotionBox = motion(Box);

const completedVariants = {
  initial: { scale: 1, rotate: 0, filter: "drop-shadow(0 0 0px #38a169)" },
  animate: {
    scale: [1, 1.18, 1],
    rotate: [0, 8, -8, 0],
    filter: [
      "drop-shadow(0 0 0px #38a169)",
      "drop-shadow(0 0 16px #38a169)",
      "drop-shadow(0 0 0px #38a169)",
    ],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const confettiVariants = {
  initial: { opacity: 0, y: -40 },
  animate: {
    opacity: [0, 1, 1, 0],
    y: [0, 20, -20, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const TodoList = () => {
  const { data: todos, isLoading } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      try {
        const res = await fetch("http://localhost:5000/api/todos");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Something went wrong");
        }
        return data;
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
      <Text
        fontSize={"4xl"}
        textTransform={"uppercase"}
        fontWeight={"bold"}
        textAlign={"center"}
        my={2}
      >
        Today's Tasks
      </Text>

      {isLoading && (
        <Flex justifyContent={"center"} my={4}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {!isLoading && todos?.length === 0 && (
        <MotionStack
          alignItems="center"
          gap="3"
          position="relative"
          variants={completedVariants}
          initial="initial"
          animate="animate"
          width="100%"
          overflow="hidden"
          minHeight="300px"
        >
          {/* Confetti Emojis */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: "1.5rem",
                pointerEvents: "none",
                zIndex: 0,
              }}
              animate={{
                y: [0, -60],
                opacity: [1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            >
              🎊
            </motion.div>
          ))}

          {/* Celebration Card */}
          <MotionBox
            zIndex={1}
            bgGradient="linear(to-r, teal.400, green.400, blue.400)"
            p={6}
            borderRadius="2xl"
            boxShadow="2xl"
            textAlign="center"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 1, -1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MotionText
              fontSize="2xl"
              fontWeight="extrabold"
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              animate={{
                letterSpacing: ["normal", "0.2em", "normal"],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              🎉 Congratulations! All tasks are done! 🎉
            </MotionText>

            <MotionText fontSize="lg" color="white" mt={2}>
              Enjoy your free time or add more tasks!
            </MotionText>

            <motion.img
              src="/go.png"
              alt="Go logo"
              width={70}
              height={70}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ margin: "0 auto" }}
            />

            <MotionText
              fontSize="4xl"
              mt={4}
              variants={confettiVariants}
              initial="initial"
              animate="animate"
            >
              🥳
            </MotionText>
          </MotionBox>
        </MotionStack>
      )}

      {/* Render Todos */}
      <Stack gap={3}>
        {todos?.map((todo) => (
          <TodoItem key={todo._id} todo={todo} />
        ))}
      </Stack>
    </>
  );
};

export default TodoList;
