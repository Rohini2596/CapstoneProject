import { Component } from '@angular/core';
import { AuthService } from '../../service/auth-service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  user: any = null;
  constructor(private authService: AuthService, private router: Router) {
  }
  ngOnInit() {
    this.authService.getUserProfile().subscribe({
      next: (res) => {
        if (res.status === 'Success') {
          this.user = res.user; // ✅ FIX
          console.log('User profile fetched', this.user);
        }
      },
      error: (err) => {
        console.error('Failed to get user profile', err);
        this.router.navigate(['/auth/login']);
      }
    });
  }
  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log("Logout successful", res);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error("Logout failed", err);
      }
    });
  }
}
