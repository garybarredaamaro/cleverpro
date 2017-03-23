<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'user';

    public function projects(){
    	return $this->belongsToMany('App\Models\Project')->withTimestamps();
    }
}
