<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectMember extends Model
{
    protected $table = 'project_member';

    public function project(){
    	return $this->hasMany('App\Models\Project', 'id', 'project_id');
    }

    public function user(){
    	return $this->hasMany('App\Models\User', 'id', 'user_id');
    }
}
