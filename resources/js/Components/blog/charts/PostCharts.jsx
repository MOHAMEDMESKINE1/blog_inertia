import React from 'react';
import  Chart  from 'react-apexcharts';
import  { useEffect, useState } from 'react';

function PostCharts({postsByDay}) {

  
    const [chartBarPosData, setChartBarPostData] = useState({
        options: {
            
          xaxis: {
            categories: []
          }
        },
        series: []
      });

    const [chartPostDonutData, setChartPostDonutData] = useState({
        options: {
            
          xaxis: {
            categories: []
          }
        },
        series: []
    });
      

    useEffect(() => {

        // Ensure postsByDay is available and not empty before updating the state
        if (postsByDay && postsByDay.length > 0) {
          const dates = postsByDay.map(item => item.date);
          const postCounts = postsByDay.map(item => item.post_count);
    
            setChartBarPostData({
            
            options: {
              xaxis: {
                categories: dates
              },
              dataLabels: {
                enabled: true,
                formatter: function (val) {
                  return val + "%"
                },
            },
          
            },

            series: [
              {
                name: "Post Count",
                data: postCounts
              }
            ],

            });  

            
            setChartPostDonutData({
                options: {
                labels: dates
                },
                series: postCounts
            });
    }

       
    }, [postsByDay]); 
    return (
       
       <>
        <div className="p-6 text-gray-900 grid grid-cols-2 gap-5">
            <div className="">
              {/* area */}
                <h1 className="text-center">Posts By Day </h1>
                <Chart options={chartBarPosData.options} series={chartBarPosData.series} type="area" />

            </div>

            <div className="">
              {/* donut */}
                <h1 className="text-center">Posts By Day </h1>
                <Chart options={chartPostDonutData.options} series={chartPostDonutData.series} type="donut" />
            </div>
        </div>
       </>
    );
}

export default PostCharts;
