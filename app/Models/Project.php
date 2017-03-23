<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Project extends Model
{
    //use SoftDeletes;

    protected $table = 'project';
    //protected $dates = ['deleted_at'];

    public function members(){
    	return $this->hasMany('App\Models\ProjectMember');
    }

    public function modules(){
    	return $this->hasMany('App\Models\Module');
    }

    public function issues(){
    	return $this->hasMany('App\Models\Issue');
    }

    public function users(){
    	return $this->belongsToMany('App\Models\User')->withTimestamps();
    }
}
