import { Component, OnInit } from '@angular/core';
declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      let hash = window.location.hash;
      hash && $('ul.nav a[href="' + hash + '"]').tab('show');

      $('.nav-tabs a').click(function(e) {
          $(this).tab('show');
          window.location.hash = this.hash;
      });
  }

}
