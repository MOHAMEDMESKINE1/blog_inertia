import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Chart from "react-apexcharts";
import { useEffect, useState } from 'react';
export default function Dashboard({ auth,postsByDay,commentsByDay }) {
    
    //   ------------------------------posts by day ------------------------------ 
    const [chartPostDonutData, setChartPostDonutData] = useState({
        options: {
            
          xaxis: {
            categories: []
          }
        },
        series: []
    });

    const [chartBarPosData, setChartBarPostData] = useState({
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

    //   ------------------------------comments by day ------------------------------ 
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
    //   ------------------------------comments by day ------------------------------ 

    
    

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {/* posts */}
                        <div className="p-6 text-gray-900 grid grid-cols-2 gap-2">
                           
                                {/* area */}
                                <div className="">
                                    <h1 className="text-center">Posts By Day </h1>
                                    <Chart options={chartBarPosData.options} series={chartBarPosData.series} type="area" />

                                </div>
                                {/* bar */}
                                <div className="">
                                    <h1 className="text-center">Posts By Day </h1>
                                    <Chart options={chartPostDonutData.options} series={chartPostDonutData.series} type="donut" />

                                </div>
                                
                        </div>
                        {/* comments */}
                        <div className="p-6 text-gray-900 grid grid-cols-2">
                           
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
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
