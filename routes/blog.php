<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PosTagController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function(){

    Route::resource('posts',PostController::class);
    Route::resource('tags',TagController::class)->except(['create', 'edit', 'show']);
    Route::resource('categories',CategoryController::class)->except(['create', 'edit', 'show']);
    Route::resource('post_tag',PosTagController::class);
});
