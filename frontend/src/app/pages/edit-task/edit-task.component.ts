import { TaskService } from './../../task.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  taskId: string;
  listId: string;


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.taskId) {
          this.taskId = params.taskId;
          this.listId = params.listId;
        }
      }
    )
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(() => {
      this.router.navigate(['/lists', this.listId])
    })
  }

}
