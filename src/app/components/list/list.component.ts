import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/Users.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public dataSource: User[];
  public displayedColumns: any[] = [];
  filterName: any;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.displayedColumns = [
      "id", "name", "login", "role"
    ]

    this.getUsers();
  }

  public filterByName() {
    this.userService.clearParameter();
    if(this.filterName) {
      this.userService.addParameter('name', this.filterName);
    }
    this.getUsers();
  }

  private getUsers() {
    this.userService.get().subscribe(response => {
      this.dataSource = response;
    })
  }
}
