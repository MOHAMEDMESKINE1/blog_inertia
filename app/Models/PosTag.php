<?php

namespace App\Models;

use App\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PosTag extends Model
{
    use HasFactory;
    
    public function posts()
    {
        return $this->belongsToMany(Post::class);
    }
}
