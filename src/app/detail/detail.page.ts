import { Component, OnInit } from '@angular/core';
import { PractionergetService } from 'src/app/services/practionerget.service';
import { practionerDetail, practionerRoleModal, medicationRequest } from 'src/app/modal/practionerlistmodel';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  url: any;
  practionerDetail: practionerDetail;
  data: string = '';
  practionerRoleData: practionerRoleModal ;
  medicationRequestList: medicationRequest[];
  constructor(
    private practionerget: PractionergetService) {
      this.url = JSON.parse(localStorage.getItem('data'));
      this.practionerDetail=JSON.parse(localStorage.getItem('data'));
      
      this.medicationRequestList=JSON.parse(localStorage.getItem('medicationRequestList'));
      this.practionerget.getDetailPractioner(this.url.detailurl).subscribe( (data) => {
        this.getdetailData();
      });

      forkJoin(
        this.practionerget.getPractionerRole(this.data),
        this.practionerget.getMedicationRequest(this.data)
    ).subscribe(([practionerRole, medicationRequest]) => {
      this.practionerRoleData = practionerRole;
      this.practionerRoleData.photo = 'data:image/png;base64,'+this.practionerRoleData.photo ;
      console.log(this.practionerRoleData,'data');
      this.medicationRequestList = medicationRequest;
      
    });
    
  }

  ngOnInit() {
    
  }

  getdetailData() {
    this.practionerDetail=JSON.parse(localStorage.getItem('detaildata'));
  }
  
  getimage(imgdata: any){
    let img = 'data:image/png;base64,'+imgdata;
    return img;
  }

}
