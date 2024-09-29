import { useContext, useEffect, useState } from "react"
import { userInfoContext } from "../../store";
import MonthlyNewMember from "../components/dashboard/charts/MonthlyNewMemberChart";
import Cards from "../components/dashboard/Cards";
import MonthlyPost from "../components/dashboard/charts/MonthlyPostChart";
import CategoryWisePost from "../components/dashboard/charts/CategoryWisePostChart";
import { usePermissionCheck } from "../../helper";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const hasPermission = usePermissionCheck();
    const userInfo = useContext(userInfoContext);
    userInfo && console.log(hasPermission('super-admin'));

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