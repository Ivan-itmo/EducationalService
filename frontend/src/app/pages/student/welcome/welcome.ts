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
export class WelcomeStudent {
  constructor(private router: Router) {}
  goBack(): void {
    this.router.navigate(['/']);
  }
}
