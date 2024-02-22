<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Requests\Post\PostRequest;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::paginate(3);
       return Inertia::render('Posts/Index',compact('posts'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
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
         ]);
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

            if(file_exists($imagePath)) {
                unlink($imagePath);
            }
                

            $file = $request->file('image');
            $filename =  uniqid() . "." . $file->getClientOriginalExtension();;
            $file->move("storage/posts", $filename);
            
            $post->image = $filename;
           
        }
                
        $post->update([
            "title"=>$request->title,
            "description"=>$request->description,
            "image"=>$filename
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
