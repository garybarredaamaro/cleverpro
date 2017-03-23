<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
   	protected $table = 'company';

   	public function users(){
   		return $this->hasMany('App\Models\User');
   	}

   	public function projects(){
   		return $this->hasMany('App\Models\Project');
   	}

}
