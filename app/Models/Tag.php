<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Scout\Searchable;

class Tag extends Model
{
    use HasFactory,Searchable;
    protected $table = 'tags';
    protected $fillable = ['name'];
    
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
