import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  username: string = '';
  repositories: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    particlesJS.load('particles-js', '../assets/particles.json', null);
  }

  onSubmit() {
    if (this.username.trim() === '') {
      // Show error if username is empty
      this.error = 'Please enter a GitHub username';
      return;
    }

    // Clear previous data and error message
    this.repositories = [];
    this.error = '';
    this.loading = true;

    // Call GitHub API to get user repositories
    this.apiService.getUser(this.username).subscribe(
      (data: any) => {
        this.repositories = data;
        this.loading = false;
      },
      (error) => {
        this.error = 'User not found';
        this.loading = false;
      }
    );
  }
}
