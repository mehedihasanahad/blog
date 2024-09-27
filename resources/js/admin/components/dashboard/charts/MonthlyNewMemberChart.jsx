import { React } from "react"
import ReactECharts from 'echarts-for-react';

export default function MonthlyNewMember({ memberReport }) {
    const options = {
        grid: { top: 8, right: 8, bottom: 24, left: 36 },
        toolbox: {
        show: true,
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
            }
        },
        xAxis: {
            type: 'category',
            data: memberReport.map((item) => item?.month_year)
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
              data: memberReport.map((item) => item?.user),
              type: 'bar',
              barMaxWidth: '50px'
            }
        ],
        tooltip: {
            trigger: 'axis',
        },
    };
    
    return (
        <>
            <div>
                <label className="block font-bold text-xl pb-4">Month Wise New Member</label>
                <ReactECharts option={options}/>
            </div>
        </>
    )
}