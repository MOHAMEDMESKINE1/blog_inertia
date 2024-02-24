<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comments  = Comment::with(['user','post'])->paginate(3);
        $posts = Post::all();

        return Inertia::render('Comments/Index',compact('comments','posts'));
    }

  
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "post"=>"required",
            "content"=>"required",
        ]);

        if(!empty($request)){

            Comment::create([
                "post_id"=>$request->post,
                "user_id"=>auth()->user()->id,
                "content"=>$request->content,
            ]);
        }

      

        return to_route('comments.index')->with('success','comment added successfully');

    }

   

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,Comment $comment)
    {

        $comment->update([
            "post"=>$request->post,
            "user_id"=>auth()->user()->id,
            "content"=>$request->content,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
    }
}
