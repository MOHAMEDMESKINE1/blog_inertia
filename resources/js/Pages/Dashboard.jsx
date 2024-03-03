import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import PostsChart from '@/Components/blog/charts/PostCharts.jsx';
import CommentCharts from '@/Components/blog/charts/CommentCharts';

export default function Dashboard({ auth,postsByDay,commentsByDay }) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
              
                <div className=" mx-auto sm:px-6 lg:px-8">
                  
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                           
                        {/* posts */}
                        <PostsChart postsByDay={postsByDay} />


                        {/* comments */}
                        <CommentCharts commentsByDay={commentsByDay}/>
                        
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
