<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if($request->filled('search')){

            $categories = Category::search(trim($request->search))->paginate(3);

        }else{
            $categories = Category::paginate(3);
        }

         return Inertia::render('Categories/Index',compact("categories"));
    }
    public function store(Request $request)
    {
        $request->validate([
            "name"=> "required"
        ]);

        Category::create(["name"=> $request->name]);

        return to_route('categories.index');
    }


    public function update(Request $request, Category $category)
    {
        if(!empty($request->name)){

            $category->update(["name"=> $request->name]);

            return to_route('categories.index');
        }
      
    }

    public function destroy(Category $category)
    {
       $category->delete();

       return to_route('categories.index')->with('category deleted successfully !');
    }
}
