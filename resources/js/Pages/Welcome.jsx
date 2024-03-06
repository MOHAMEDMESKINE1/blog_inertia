import Footer from '@/Layouts/Footer';
import { Link, Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Hero from './Home/Hero.jsx';
import Posts from './Home/Posts.jsx';
import SearchSide from './Home/SearchSide.jsx';
export default function Welcome() {
    return (
        <>
            <Head title="Welcome" />
          

                <AppLayout>
                    <Hero/>
                    <div className="m-10">
                     
                        <Posts/>
                       
                           
                     
                       
                    </div>    
                </AppLayout>

        </>
    );
}
