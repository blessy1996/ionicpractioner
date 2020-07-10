import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { PractionergetService } from 'src/app/services/practionerget.service';
import { practionerDetail } from 'src/app/modal/practionerlistmodel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  url: any;
  practionerDetail: practionerDetail;
  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private practionerget: PractionergetService) {
      this.practionerget.getDetailPractioner(this.practionerget.practionerUrl).subscribe( (data) => {
        this.practionerDetail = data;
      });
     }

  ngOnInit() {
    this.router.navigate(['detail']);
  
  }

}
