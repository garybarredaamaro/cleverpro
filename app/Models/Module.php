<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $table = 'module';

    public function tasks(){
    	return $this->hasMany('App\Models\Task');
    }
}
