<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TagController extends Controller
{
    
    public function index(Request $request)
    {
        
        if($request->filled('search')){

            $tags = Tag::search($request->search)->paginate(3);

        }else{
            $tags = Tag::paginate(3);
        }

      

        return Inertia::render('Tags/Index',compact('tags'));
    }

    public function store(Request $request)
    {
        $request->validate([
            "name"=> "required"
        ]);

        Tag::create(["name"=> $request->name]);

        return to_route('tags.index')->with('success','Tag Created Sucessfully');
    }


    public function update(Request $request, Tag $tag)
    {
        if(!empty($request->name)){

            $tag->update(["name"=> $request->name]);

            return to_route('tags.index')->with('success','Tag Updated Sucessfully');
        }
      
    }

    public function destroy(Tag $tag)
    {
       $tag->delete();

       return to_route('tags.index')->with('success','Tag deleted successfully !');
    }
}
