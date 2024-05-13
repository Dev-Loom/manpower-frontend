import { Component, OnInit } from '@angular/core';
import { UIService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'CMMS';

  constructor(private uiService: UIService) {}

  isAuthenticated: boolean = false;

  ngOnInit(): void {
    this.uiService.isAuthenticated.subscribe((res) => {
      this.isAuthenticated = res;
    });
  }
}
