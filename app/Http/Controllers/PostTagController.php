<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use App\Models\Post;
use Inertia\Inertia;
use App\Models\PostTag;
use Illuminate\Http\Request;

class PostTagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        $postTags  = PostTag::with('posts','tags')->paginate(3);
        $posts = Post::select('id','title')->get();
        $tags = Tag::all();

        return Inertia::render('PostTags/Index',compact('postTags','posts','tags'));
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
    public function store(Request $request)
    {
        PostTag::create($request->all());

        return to_route('post_tag.index')->with('success','Post Tag Added Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PostTag $postTag)
    {
        $postTag->update([
            
            "post_id"=>$request->post_id,
            "tag_id"=>$request->tag_id,
        ]);

        return to_route('post_tag.index')->with('success','Post Tag updated Successfully');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PostTag $postTag)
    {
        $postTag->delete();

        return to_route('post_tag.index')->with('success','Post Tag Added Successfully');
    }
}
