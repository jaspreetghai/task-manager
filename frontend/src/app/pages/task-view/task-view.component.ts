import { List } from './../../models/list.model';
import { Task } from './../../models/tasks.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];

  selectedListId: string;


  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          this.taskService.getTasks(params.listId).subscribe((tasks: Task[]) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = undefined;
        }
      }
    )

    this.taskService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })
    
  }

  onTaskClick(task: Task) {
    this.taskService.complete(task).subscribe((res) => {
      // add class when task is completed successfully
      task.completed = !task.completed;
    })
  }

  onDeleteList(listId: string) {
    this.taskService.deleteList(listId).subscribe((res: any) => {
      console.log("onDeleteList");
      this.router.navigateByUrl('/lists', {skipLocationChange: true}).then(()=>
   this.router.navigate(['/lists']));
      // this.router.navigate(['/lists'])
    });
  }

  onDeleteTask(taskId: string) {
    this.taskService.deleteTask(this.selectedListId, taskId).subscribe((res: any) => {
      console.log("onDeleteTask");
      this.tasks = this.tasks.filter(val => val._id !== taskId);
      // this.router.navigate(['/lists', this.selectedListId])
    });
  }
}
