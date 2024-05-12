import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

import { User } from './user';
import { Repo } from './repo';

declare var particlesJS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  username: string = '';
  githubUsername: string = '';

  user!: User;
  repos: Repo[] = [];
  pageIndex = 1;
  perPage = 10;

  repositories: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    particlesJS.load('particles-js', '../assets/particles.json', null);
  }

  onSubmit() {
    this.fetchUserDetails(this.username);
    this.githubUsername = this.username;
  }

  private fetchUserDetails(username: string): void {
    this.api.getUser(username).subscribe({
      next: (response) => {
        this.user = response;
        this.getUserRepos(this.user.login);
      },
      error: (err) => {
        console.error('Error fetching user:', err);
      },
      complete: () => {
        console.log('Fetched user details successfully');
      },
    });
  }

  private getUserRepos(username: string): void {
    this.api.getRepos(username, this.perPage, this.pageIndex).subscribe({
      next: (response) => {
        this.repos = response;
      },
      error: (err) => {
        console.error('Error fetching repos:', err);
      },
      complete: () => {
        console.log('Fetched repos successfully', this.repos);
      },
    });
  }
}
