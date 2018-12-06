import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Node 1';
  public form: FormGroup;
  public formSearch: FormGroup;
  public resData

  constructor(
    private sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.createForm();
    this.createSearchForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      city: [''],
      temperature: [''],
      metadata: ['']
    });
  }

  createSearchForm() {
    this.formSearch = this.formBuilder.group({
      term: ['']
    });
  }

  onSubmit() {

    const data = {
      city: this.form.get('city').value,
      temperature: this.form.get('temperature').value,
      metadata: this.form.get('metadata').value
    };

    this.authService.create(data).subscribe(response => {
      if (!response.success) {
        this.resData = response;
        console.log(response);
      } else {
        this.resData = response;
        console.log(response);
      }
    });

  }

  onSubmitSearchTerm() {

    const data = {
      term: this.formSearch.get('term').value
    };

    this.authService.search(data).subscribe(response => {
      if (!response.success) {
        this.resData = response;
        console.log(response);
      } else {
        this.resData = response;
        console.log(response);
      }
    });
  }

  ngOnInit(): void {
  }
}
