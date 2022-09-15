import { useCookies } from "react-cookie"

function saveToCookies(){
    const [cookies, setCookies] = useCookies(['name'])
    
}