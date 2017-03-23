<?php

use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\DatabaseTransactions;

use App\Models\Task;

class UserTest extends TestCase
{
    public function test27(){

        $task = Task::find(74);
        $task_expected = 'pass';
        $actual = 'pass';
        try {
            $this->visit('http://localhost:8000/todo')
                ->type('Gary', 'name')
                ->type('gary', 'password')
                ->press('Submit')
                ->see('success');
        } catch (Exception $e) {
            $actual = 'fail';
        }

        $task->status = ($task_expected == $actual) ? 'Completed' : 'Redevelop';
        $task->save();
    }
}
