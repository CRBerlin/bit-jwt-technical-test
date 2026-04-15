import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../services/users';
import { ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  private readonly usersService = inject(UsersService);
  private readonly cdr = inject(ChangeDetectorRef);

  users: any[] = [];
  newUser = {
    name: '',
    email: '',
    password: '',
    role: 'user',
  };

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getAllUsers().subscribe((res: any) => {
      this.users = res.data;
      this.cdr.detectChanges();
      console.log('usuarios:', this.users);
    });
  }

  createUser() {
    this.usersService.createUser(this.newUser).subscribe({
      next: () => {
        this.loadUsers(); // refresca la tabla
        this.resetForm(); // cierra el modal
        const modal = document.getElementById('modalNuevoUsuario');
        const bsModal = (globalThis as any).bootstrap.Modal.getInstance(modal);
        bsModal?.hide();
      },
      error: (err) => console.error('Error al crear usuario:', err),
    });
  }

  resetForm() {
    this.newUser = { name: '', email: '', password: '', role: 'user' };
  }
}
