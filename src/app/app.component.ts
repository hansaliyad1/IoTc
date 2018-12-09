import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from './services/auth.service';
import {forEach} from '@angular/router/src/utils/collection';
import {promise} from 'selenium-webdriver';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Node 1';
  public form: FormGroup;
  public formSearch: FormGroup;
  public resData;

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

  onClickWrite () {
    this.authService.fetch().subscribe(response => {

      const totalData = 100;
      const t1 = new Date().getTime();
      const promise1 = new Promise((resolve) => {

        for (let i = 0; i <= totalData; i++) {

          const data = {
            city: response[i].data,
            temperature: 32,
            metadata: response[i].data
          };

          this.authService.create(data).subscribe(res => {
            const t3 = new Date().getTime();
            if (!res.success) {
              console.log(res);
            } else {
              console.log(res, t3 - t1);
              if (i === totalData) {
                resolve();
              }
            }
          });
        }
      });

      promise1.then(() => {const t2 = new Date().getTime(); console.log(t2 - t1); });

    });
  }

  onClickRead () {

    this.authService.fetch().subscribe(response => {

      const totalData = 10000;
      const t1 = new Date().getTime();
      const promise1 = new Promise((resolve) => {

        for (let i = 0; i <= totalData; i++) {

          const data = {
            term: response[i].data
          };

          this.authService.search(data).subscribe(res => {
            const t3 = new Date().getTime();
            if (!res.success) {
              console.log(res);
            } else {
              console.log(res, t3 - t1);
              if (i === totalData) {
                resolve();
              }
            }
          });

        }

      });

      promise1.then(() => {const t2 = new Date().getTime(); console.log(t2 - t1); });

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
