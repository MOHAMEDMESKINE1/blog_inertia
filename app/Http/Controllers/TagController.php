<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    
    public function index()
    {
        $tags =Tag::paginate(3);

        return Inertia::render('Tags/Index',compact('tags'));
    }

    public function store(Request $request)
    {
        $request->validate([
            "name"=> "required"
        ]);

        Tag::create(["name"=> $request->name]);

        return to_route('tags.index');
    }


    public function update(Request $request, Tag $tag)
    {
        if(!empty($request->name)){

            $tag->update(["name"=> $request->name]);

            return to_route('tags.index');
        }
      
    }

    public function destroy(Tag $tag)
    {
       $tag->delete();

       return to_route('tags.index')->with('Tag deleted successfully !');
    }
}
