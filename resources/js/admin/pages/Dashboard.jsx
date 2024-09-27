import { useContext, useEffect, useState } from "react"
import { userInfoContext } from "../../store";
import MonthlyNewMember from "../components/dashboard/charts/MonthlyNewMemberChart";
import Cards from "../components/dashboard/Cards";
import MonthlyPost from "../components/dashboard/charts/MonthlyPostChart";
import CategoryWisePost from "../components/dashboard/charts/CategoryWisePostChart";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    // const userInfo = useContext(userInfoContext);
    // console.log(userInfo);

    useEffect(() => {
        setLoading(true);
        $axios.get('chart-reports')
        .then( (res) => {
            setData({
                ...res.data.data
            });
            setLoading(false);
        })
        .catch(error => {
            console.error(error);
            alert(error?.message)
        });
    }, []);
    
    return (
        <>
            <Cards/>
            <div className="pt-12 grid xl:grid-cols-2 gap-12">
                {data?.category_wise_posts && <CategoryWisePost categoryReport={data?.category_wise_posts}/>}
                {data?.month_wise_posts && <MonthlyPost postReport={data?.month_wise_posts}/>}
                {data?.month_wise_users && <MonthlyNewMember memberReport={data?.month_wise_users}/>}
            </div>
        </>
    )
}