import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.css']
})
export class WelcomeTeacher {
  constructor(private router: Router) {}
  goBack(): void {
    this.router.navigate(['/']); // ← возвращаемся назад в истории браузера
  }
}
