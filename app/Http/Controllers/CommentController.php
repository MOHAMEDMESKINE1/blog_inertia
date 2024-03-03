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
    public function index(Request $request)
    {
        
        if($request->filled('search')){

            $comments = Comment::search(trim($request->search))->paginate(3);
            $comments->load('user');
            $comments->load('post');
          }else{
            $comments  = Comment::with(['user','post'])->paginate(3);

          }

        // $comments  = Comment::with(['user','post'])->paginate(3);
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

      if(!empty($request)){

        $comment->update([
            "post_id"=>intval($request->post),
            "user_id"=>auth()->user()->id,
            "content"=>$request->content,
        ]);
        return to_route('comments.index')->with('success','comment updated successfully');

      }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        $comment->delete();
    }
}
