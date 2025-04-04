import { useEffect, useState } from "react"
import MonthlyNewMember from "../components/dashboard/charts/MonthlyNewMemberChart";
import Cards from "../components/dashboard/Cards";
import MonthlyPost from "../components/dashboard/charts/MonthlyPostChart";
import CategoryWisePost from "../components/dashboard/charts/CategoryWisePostChart";
import { usePermissionCheck } from "../../helper";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const hasPermission = usePermissionCheck();

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
                {
                    hasPermission('dashboard-category-wise-post-chart') &&
                    data?.category_wise_posts && <CategoryWisePost categoryReport={data?.category_wise_posts}/>
                }
                {
                    hasPermission('dashboard-month-wise-post-chart') &&
                    data?.month_wise_posts && <MonthlyPost postReport={data?.month_wise_posts}/>
                }
                {
                    hasPermission('dashboard-month-wise-new-member-chart') && 
                    data?.month_wise_users && <MonthlyNewMember memberReport={data?.month_wise_users}/>
                }
            </div>
        </>
    )
}