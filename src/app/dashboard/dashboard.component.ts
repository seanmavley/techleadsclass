import { Component, OnInit } from '@angular/core';
import { CodeService } from '../providers/code.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  err: string;
  codes: any;
  busy: boolean;
  delete_code: any;
  is_toggling: boolean;

  constructor(private code: CodeService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getUserCodes()
  }

  deleteCode(code) {
    this.code.delete_code(code)
      .subscribe((res) => {
        if(res.json().state) {
          this.getUserCodes();
          this.toastr.success('Delete successfuly', 'Great work');
        }
      })
  }

  showModal(code) {
    this.delete_code = code;
    $('#exampleModal').on('show.bs.modal', function (event) {
      let modal = $(this)

      modal.find('.modal-title').text(`Do you really wanna delete ${code.title}`)
      modal.find('.modal-body p .lead').text('You do realize this action is not reversible, right?')
    })
  }

  toggleStolen(is_stolen, card_id) {
    this.is_toggling = true;
    let toggle_is_stolen = !is_stolen
    this.code.toggle_is_stolen(card_id, toggle_is_stolen)
      .subscribe((res) => {
        this.is_toggling = false;
        if(res.json().state) {
          this.codes.findIndex(obj => {
            if(obj._id == card_id) {
              obj.is_stolen = toggle_is_stolen;
            }
          })
        }
      })
  }

  getUserCodes() {
    this.code.user_codes()
      .subscribe((res) => {
        this.busy = false;
        if(res.json().state) {
          this.codes = res.json().codes;
        } else {
          this.toastr.error('You likely do not have any codes', 'Empty Codes');
        }
      })
  }

  onSubmit(formvalues) {
    console.log(formvalues);
    this.code.create_code(formvalues)
      .subscribe((res) => {
        if(res.json().state) {
          this.toastr.success(res.json().msg, 'Successful');
          this.getUserCodes();
        } else {
          this.toastr.error(res.json().error, 'An error occured');
          this.err = res.json().error;
        }
      })
  }

}
