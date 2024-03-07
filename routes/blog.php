<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\PostTagController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth', 'twostep')->group(function(){

    // posts
    Route::resource('posts',PostController::class);
   
    Route::controller(PostController::class)->group(function(){
        Route::get('posts/order','orderBy')->name('posts.orderby');

        Route::get('dashboard','charts')->name('dashboard');
    });


    Route::resource('tags',TagController::class)->except(['create', 'edit', 'show']);
    Route::resource('categories',CategoryController::class)->except(['create', 'edit', 'show']);
    Route::resource('post_tag',PostTagController::class);
    Route::resource('comments',CommentController::class)->except(['create', 'edit', 'show']);
});
