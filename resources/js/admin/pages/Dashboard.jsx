import { useContext } from "react"
import { userInfoContext } from "../../store";

export default function Dashboard() {
    // const userInfo = useContext(userInfoContext);
    // console.log(userInfo);
    
    return (
        <h1 className="text-lg font-medium bg-red-500">
            Dashboard
        </h1>
    )
}
