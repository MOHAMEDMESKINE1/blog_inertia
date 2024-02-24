<?php

namespace App\Http\Controllers;

use App\Models\PosTag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PosTagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
         $post_tag = PosTag::paginate(3);


         return Inertia::render('PosTags/Index',compact('post_tag'));
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
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
