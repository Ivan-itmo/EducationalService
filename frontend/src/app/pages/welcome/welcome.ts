// src/app/pages/welcome/welcome.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css'] // ← styleUrls (множественное число!)
})
export class Welcome {}
