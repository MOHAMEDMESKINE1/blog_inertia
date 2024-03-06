<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index(){

        $posts = Post::with("user")->paginate(4);
        return Inertia::render('Welcome',compact('posts'));
    }
    public function search(Request $request){

        // Check if a search query is present
        $searchQuery =$request->search;
    
       
        
        if($request->filled('search')){

          $posts = Post::search(trim($searchQuery))->paginate(3);
          $posts->load('user');

        }else{
            $posts = Post::with('user')->paginate(3);
        }
        return Inertia::render('Home/SearchSide',compact('posts'));

    }

   
}
