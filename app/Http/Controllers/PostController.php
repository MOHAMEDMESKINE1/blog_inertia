<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Post\PostRequest;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function charts(){
        
        $postsByDay = Post::select(DB::raw('date(created_at) as date'), DB::raw('count(*) as post_count'))
            ->groupBy(DB::raw('date(created_at)'))
            ->orderBy('date', 'asc')->get();
            
        // dd($postsByDay);

        $commentsByDay = Comment::select(DB::raw('date(created_at) as date'), DB::raw('count(*) as comment_count'))
            ->groupBy(DB::raw('date(created_at)'))
            ->orderBy('date', 'asc')
            ->get();

        return Inertia::render('Dashboard', [
            'postsByDay' => $postsByDay,
            'commentsByDay' => $commentsByDay,
        ]);
    }
    public function index()
    {
        // Check if a search query is present
        $searchQuery = request()->input('search');
    
        // If there's a search query, filter posts by title; otherwise, get all posts
        $postsQuery =!empty( $searchQuery)
            ? Post::with('user')
                    ->where(function ($query) use ($searchQuery) {

                        $query->where('title', 'like', '%' . $searchQuery . '%')

                         ->orWhereHas('user', function ($userQuery) use ($searchQuery) {

                          $userQuery->where('name', 'like', '%' .$searchQuery. '%');

                        });
            })
            : Post::with('user');
    
        // Paginate the results

        $posts = $postsQuery->paginate(3);
        
         

       return Inertia::render('Posts/Index',compact('posts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    public function orderBy(){

        $query = request()->input('orderby');

        if ($query && in_array(strtolower($query), ['asc', 'desc'])) {

            $posts = Post::with('user')->orderBy("title", $query)->paginate(3);

        } else {
            // Default to "asc" if the provided order is invalid
            $posts = Post::with('user')->orderBy("title",'asc')->paginate(3);
        }

     

        

        return Inertia::render('Posts/Index',compact('posts'));

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        if(request()->hasfile('image'))
        {
            $file = request()->file('image');
            $filename =  uniqid() . "." . $file->getClientOriginalExtension();;
            $file->move("storage/posts", $filename);
            
            $image = $filename;
        }
                
         Post::create([
            "title"=>$request->title,
            "description"=>$request->description,
            "image"=>$image  ,
            "user_id"=> auth()->user()->id
         ]);
         return to_route('posts.index')->with('success','Post added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Inertia::render('Posts/Details',compact('post'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        return Inertia::render('Posts/Edit',compact('post'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        if($request->hasfile('image'))
        {
            $imagePath = "storage/posts/{$post->image}";

            if($post->image){
                if(file_exists($imagePath)) {
                    unlink($imagePath);
                }
            }
                

            $file = $request->file('image');
            $filename =  uniqid() . "." . $file->getClientOriginalExtension();;
            $file->move("storage/posts", $filename);
            
            $post->image = $filename;
           
        }
                
        $post->update([
            "title"=>$request->title,
            "description"=>$request->description,
            "image"=> $filename?? $post->image
         ]);

        return redirect()->route('posts.index')->with('success', 'Post updated successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $imagePath = "storage/posts/{$post->image}";

        if(file_exists($imagePath)) {
            unlink($imagePath);
        }

        // Delete the post
        $post->delete();

        return redirect()->route('posts.index')->with('success', 'Post deleted successfully');
    }
}
