import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  username: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUser('sahil').subscribe(console.log);
  }
  onSubmit() {
    alert('Hello to project');
  }
}
