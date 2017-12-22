import { Component, OnInit } from '@angular/core';
import { CodeService } from '../providers/code.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  is_searching: boolean;
  code: any;
  empty: true;

  constructor(private codeService: CodeService, private toastr:ToastrService) { }

  ngOnInit() {
  }

  onSearch(formData) {
    this.is_searching = true;
    console.log(formData);
    this.codeService.search(formData.search)
      .subscribe((res) => {
        this.is_searching = false;
        console.log(res.json());
        if(res.json().state) {
          this.code = res.json().code;
        }
        if(res.json().empty) {
          this.empty = true;
        }
      }, (err) => {
        this.toastr.error('Could not make the request', 'Error');
      })
  }

}
