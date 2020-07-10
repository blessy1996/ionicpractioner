import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PractionergetService } from '../services/practionerget.service';
import * as _ from 'lodash';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  // detailpageUrl: string = 'home/details';
  practioners: any;
  practionerrole: any;
  finalData: any[]=[];
  temp: any;
  data: string='';
  groupedArray: any;

  constructor(private menu: MenuController,
    private navctrl: NavController,
    private route:Router,
    private practionerget: PractionergetService) {
    this.practionerget.getpractioner(this.data).subscribe( (data) => {
      this.practioners = data;
      this.groupedArray = _.groupBy(this.practioners, 'gender');
      // let date: any = moment('2020-06-18T15:30:00.000+05:30').format('DD-MMM-YYYY');
      let datee = new  Date ("2020-06-18T15:30:00.000+05:30");
      var today = (datee).getDay();
      
    });
    // this.practionerget.getPractionerRole(this.data).subscribe( (data) => {
    //   this.practionerrole = data;
    // });
    // for(let i = 0; i < this.practioners.length; i++){
    //   this.temp.name = this.practioners[i].name ? this.practioners[i].name : '';
    //   this.temp.speciality = this.practionerrole[i].speciality ? this.practionerrole[i].speciality : '';
    //   this.finalData.push(this.temp);
    // }
   }

  ngOnInit() {
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }
  public detail(url: any, practioner: any){
    // this.navctrl.pop();
    this.practionerget.practionerUrl = url;
    this.practionerget.practDetail = practioner;
    localStorage.setItem('data',JSON.stringify (practioner))
    this.route.navigate(['details']);
    
  }

}
