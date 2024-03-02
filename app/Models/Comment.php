<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Scout\Searchable;

class Comment extends Model
{
    use HasFactory,Searchable;
    protected $guarded = [""];

    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

    public function post()
    {
        return $this->belongsTo(Post::class,'post_id');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }

    public function toSearchableArray()
    {
        $array = $this->toArray();

        // Include user and post information in the searchable array
        $array['content'] = $this->content;

        return $array;
    }
}
