import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true, // 🔥 clave
  imports: [FormsModule, CommonModule], // 🔥 clave
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  error = '';

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  onSubmit() {
    this.error = '';
    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => this.router.navigateByUrl('/usuarios', { replaceUrl: true }),

        error: (err) => {
          console.log('ERROR LOGIN', err);
          this.error = 'Credenciales incorrectas';
          this.cdr.detectChanges();
        },
      });
  }
}
