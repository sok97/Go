import {  Container, Stack } from "@chakra-ui/react"
import Navbar from "./components/Navbar"
import Todoform from "./components/Todoform"
import TodoList from "./components/Todolist"
export const BASE_URL = import.meta.env.MODE ==="development" ? "http://localhost:5000/api"  :"/api"


function App() {


  return (
    <Stack>
      <Navbar/>
      <Container>
      <Todoform/>
      <TodoList/>
      </Container>
      
    </Stack>
  )
}

export default App
