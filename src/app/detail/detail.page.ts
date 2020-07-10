import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PractionergetService } from 'src/app/services/practionerget.service';
import { practionerDetail } from 'src/app/modal/practionerlistmodel';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  url: any;
  practionerDetail: practionerDetail;
  constructor(private activatedRoute: ActivatedRoute,
    private practionerget: PractionergetService) {
      this.practionerget.getDetailPractioner(this.practionerget.practionerUrl).subscribe( (data) => {
        this.practionerDetail = data;
      });
     }

  ngOnInit() {
    this.practionerDetail=JSON.parse(localStorage.getItem('data'))
  }

}
