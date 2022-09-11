import './App.css'
import useLocalStorage from './Hooks/useLocalStorage'
import Startpage from "./Startpage/Startpage"
import LogIn from './Authentication/LogIn'
import SignIn from "./Authentication/SignIn"
import Profil from './ProfilPage/Profil'
import Post from './Post/Post'
import { Route, Routes} from "react-router-dom"

function App() {
  const [userName, setUserName] = useLocalStorage('username', {name: "", lastname: ""})
  return (
    <div className ="App w-100" style = {{height: "100vh"}}>
      <Routes>
        <Route path='/' element = {<Startpage userName = {userName}/>} />
        <Route path='/Login' element = {<LogIn setUserName = {setUserName}/>} />
        <Route path='/Signin' element = {<SignIn />} />
        <Route path='/post/:id' element = {<Post userName = {userName}/>}/>
        <Route path='/:name&:lastname/:id' element = {<Profil/>}/>
      </Routes>
    </div>
  )
}

export default App
