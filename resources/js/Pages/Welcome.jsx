import Home from '@/Home';
import Footer from '@/Layouts/Footer';
import { Link, Head } from '@inertiajs/react';
export default function Welcome({auth}) {
    return (
        <>
            <Head title="Welcome" />
                <div className="relative  sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter  selection:bg-red-500 selection:text-white">
                    <div className="sm:fixed bg-gray-100  sm:top-0 sm:right-0 p-6 text-end">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Dashboard 
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="font-semibold text-gray-950 hover:text-gray-900 dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route('register')}
                                    className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400  focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="m-10">
                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iusto officia architecto optio. Tempore, rem. Consequuntur laboriosam consectetur vel enim dolores, ipsam ipsa doloremque error dolorum ducimus inventore maxime quos vitae quo velit expedita labore aliquam repellendus neque. Vitae nulla accusamus consequatur nam totam ad quod, dolorum, eaque obcaecati quia iusto, officiis numquam eligendi? Porro quos, similique quaerat mollitia rerum minus nulla neque commodi, voluptas sed magni fugiat eum ipsum amet, quisquam animi atque illum. Eius molestias voluptate consectetur cum quo id asperiores perspiciatis nulla suscipit esse itaque, laborum magni perferendis corrupti vero deserunt pariatur nihil recusandae! Architecto delectus accusantium non, distinctio aperiam iusto asperiores enim blanditiis, error suscipit atque sequi, deserunt voluptas voluptatum illo aut quaerat iure sit accusamus optio repellendus perspiciatis laboriosam est sed. Eaque veniam dolor deleniti modi inventore! Reiciendis rerum, odit facilis id, pariatur eius modi sed nihil harum voluptates voluptate sint fuga quaerat! Natus, sunt. */}
                  
                    </div>
                </div> 
           
           <Footer/>
        </>
    );
}
