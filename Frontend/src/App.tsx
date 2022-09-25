import useCookies from './Hooks/useCookies'
import Startpage from "./Startpage/Startpage"
import LogIn from './Authentication/LogIn'
import SignIn from "./Authentication/SignIn"
import Profil from './ProfilPage/Profil'
import CreatePost from './Post/CreatePost'
import Post from './Post/Post'
import { Route, Routes} from "react-router-dom"
import { PostProvider } from './Context/usePost'
import { CommentProvider } from './Context/useComment'

function App() {
  const [user, setUser] = useCookies('User', {name: '', lastname: '', id: ''})
  
  return (
    <div className ="App w-100" style = {{height: "100vh"}}>
      <Routes>
        <Route path='/' element = {<Startpage user = {user}/>} />
        <Route path='/Login' element = {<LogIn setUser = {setUser}/>} />
        <Route path='/Signin' element = {<SignIn />} />
        <Route path='/createpost/:id' element = {<CreatePost user = {user}/>}/>
        <Route path='/:name&:lastname/:id' element = {<Profil/>}/>
        <Route path='/post/:id' element = {<PostProvider>
                                              <CommentProvider>
                                                <Post id = {user.id}/>
                                              </CommentProvider>
                                          </PostProvider>}/>
      </Routes>
    </div>
  )
}

export default App
