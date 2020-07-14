import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PractionergetService } from '../services/practionerget.service';
import * as _ from 'lodash';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { practionerDetail, practionerRoleModal, medicationRequest } from '../modal/practionerlistmodel';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  practionerRoleData: practionerRoleModal;
  medicationRequestList: medicationRequest[];
  
  practioners: any;
  practionerrole: any;
  finalData: any[] = [];
  temp: any;
  data: string = '';
  groupedArray: any;
  practionerDetail: practionerDetail;

  constructor(private menu: MenuController,
    private navctrl: NavController,
    private router: Router,
    private practionerget: PractionergetService) {
    this.practionerget.getpractioner(this.data).subscribe((data) => {
      this.practioners = data;
      this.groupedArray = _.groupBy(this.practioners, 'gender');

    });
    this.practionerget.getPractionerRole('').subscribe(resp => {
      this.practionerRoleData = resp;
      this.practionerRoleData.photo = 'data:image/png;base64,' + this.practionerRoleData.photo;
      
    })
   
  }
  

  

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  public detail(url: any, practioner: any) {
    this.navctrl.pop();

    localStorage.clear();

    localStorage.setItem('data', JSON.stringify(practioner));

    this.router.navigate(['detail']);
  }

}
