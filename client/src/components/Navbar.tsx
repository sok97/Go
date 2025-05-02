
import {
  Box,
  Flex,
  Heading,
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import { MdWbSunny, MdNightlightRound } from 'react-icons/md'
import { motion } from 'framer-motion'

const MotionIconButton = motion(IconButton)

const glowVariants = {
  animate: {
    textShadow: [
      '0 0 10px #FF0080, 0 0 20px #FF0080',
      '0 0 10px #7928CA, 0 0 20px #7928CA',
      '0 0 10px #00BFFF, 0 0 20px #00BFFF',
      '0 0 10px #38A169, 0 0 20px #38A169',
      '0 0 10px #FF0080, 0 0 20px #FF0080',
    ],
    color: [
      '#FF0080',
      '#7928CA',
      '#00BFFF',
      '#38A169',
      '#FF0080',
    ],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

const themeButtonVariants = {
  animate: {
    boxShadow: [
      '0 0 10px #ECC94B',
      '0 0 20px #319795',
      '0 0 10px #ECC94B',
      '0 0 20px #319795',
      '0 0 10px #ECC94B',
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

function Navbar() {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box boxShadow="md" px={4} py={2} bg={colorMode === 'light' ? 'white' : 'gray.800'}>
      <Flex align="center" justify="center">
        <motion.div
          variants={glowVariants}
          animate="animate"
        >
          <Heading size="md" mr={8}>
            Todo App
          </Heading>
        </motion.div>
        <MotionIconButton
          aria-label="Toggle theme"
          icon={colorMode === 'light' ? <MdNightlightRound /> : <MdWbSunny />}
          onClick={toggleColorMode}
          variant="ghost"
          variants={themeButtonVariants}
          animate="animate"
          whileHover={{ scale: 1.2, rotate: 20 }}
          whileTap={{ scale: 0.9, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400 }}
        />
      </Flex>
    </Box>
  )
}

export default Navbar