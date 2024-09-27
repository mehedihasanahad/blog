import { React } from "react"
import ReactECharts from 'echarts-for-react';

export default function CategoryWisePost({ categoryReport }) {
    const options = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'horizontal',
            left: '0px',
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: '80%',
              top: '40px',
              data: categoryReport.map((item) => ({
                name: item.name,
                value: item.post
              })),
              label: {
                show: false  // Hide label text
              },
              labelLine: {
                show: false // Disable the label arrow/guide line
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
    };
    
    return (
        <>
            <div>
                <label className="block font-bold text-xl pb-4">Category Wise Post</label>
                <ReactECharts option={options}/>
            </div>
        </>
    )
}