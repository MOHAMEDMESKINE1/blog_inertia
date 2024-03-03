<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PostTag extends Model
{
    use HasFactory;
    protected $fillable = ["post_id","tag_id","post_tags_id"];
   

    public function posts()
    {
        return $this->belongsToMany(Post::class,'post_tags','post_id','tag_id');
    }
    public function tags()
    {
        return $this->belongsTo(Tag::class,'tag_id');
    }
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }
    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }
}
