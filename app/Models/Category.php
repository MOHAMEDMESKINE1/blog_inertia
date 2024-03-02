<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Post;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Scout\Searchable;

class Category extends Model
{
    use HasFactory,Searchable;
    protected $guarded = [""];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }
    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }
    public function toSearchableArray()
    {
        return [
            "id"=> $this->id,
            "name"=>$this->name,
        ];
    }
    
}
