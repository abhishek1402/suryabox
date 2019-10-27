import { Component, TemplateRef } from '@angular/core';
import { Http } from '@angular/http';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  modalRef: BsModalRef;
  title = 'suryabox';
  items = [];
  filteredItems = [];
  description = '';
  filterMode = false;
  editMode = false;
  constructor(private http: Http, private modalService: BsModalService) {

  }
  ngOnInit() {
    this.http.get('https://andywiranata-42555.firebaseio.com/test-frontend/items.json').
    subscribe(
       (res) => {
        this.items = res.json();
        this.items.forEach(item => {
          item.editMode = false;
          this.filteredItems.push(item);
        });
        console.log(this.items);
      });
  }

  openModal(template: TemplateRef<any>, description) {
    this.modalRef = this.modalService.show(template);
    this.description = description;
  }

  save(item) {
    this.http.put('https://andywiranata-42555.firebaseio.com/test-frontend/items/0.json',
      item
    ).
    subscribe(
       (res) => {
        item.editMode = false;
      }, err => item.editMode = false);
  }
  fitler(value, field) {
    this.filteredItems = this.items.filter(ele => {
      if(typeof ele[field]=="number"){
        let string = String(ele[field]);
        if (string.indexOf(value) !== -1) {
          return ele;
        }
        else{return }
      }
      if (ele[field].indexOf(value) !== -1) {
        return ele;
      }
    });
  }
}
