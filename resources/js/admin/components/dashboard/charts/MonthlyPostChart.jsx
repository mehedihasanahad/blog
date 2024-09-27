import { React } from "react"
import ReactECharts from 'echarts-for-react';

export default function MonthlyPost({ postReport }) {
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
            data: postReport.map((item) => item.month_year)
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
              data: postReport.map((item) => item.post),
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
                <label className="block font-bold text-xl pb-4">Month Wise Post</label>
                <ReactECharts option={options}/>
            </div>
        </>
    )
}