import React, { useEffect, useState } from 'react';
import  Chart  from 'react-apexcharts';

function CommentCharts({commentsByDay}) {
    
    const [chartCommentData, setChartCommentData] = useState({
        options: {
           
          xaxis: {
            categories: []
          }
        },
        series: []
      });

    useEffect(() => {

        // Ensure commentsByDay is available and not empty before updating the state
        if (commentsByDay && commentsByDay.length > 0) {
          const dates = commentsByDay.map(item => item.date);
          const commentsCounts = commentsByDay.map(item => item.comment_count);
    
          setChartCommentData({
            options: {
               
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%"
                },
                
                },
              xaxis: {
                categories: dates
              }
            },
            series: [
              {
                name: "Comment Count",
                data: commentsCounts
              }
            ]
          });
        }
      }, [commentsByDay]); 
    return (
        <div className="p-6 text-gray-900 grid grid-cols-2 gap-5">
                           
            {/* line */}
            <div className="">
                <h1 className="text-center">Comments By Day </h1>
                <Chart options={chartCommentData.options} series={chartCommentData.series} type="line" />

            </div>
            {/* bar */}
            <div className="">
                <h1 className="text-center">Comments By Day </h1>
                <Chart options={chartCommentData.options}  series={chartCommentData.series} type="bar" />

            </div>
        
        </div>
    );
}

export default CommentCharts;