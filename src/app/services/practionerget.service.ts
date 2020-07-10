import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable,of, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { practioner, practionerDetail } from '../modal/practionerlistmodel'
// import { HttpClient, HttpHeaders, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PractionergetService {

  practionerlist: practioner [] = [];
  practionerDetail:practionerDetail = {
    name: '',
    id: null,
    role: '',
    identifier: '',
    speciality: '',
    birthdate: '',
    gender: ''
  }

  practionerUrl: string = '';
  practDetail: practioner;

  constructor(
    private http: HttpClient) { }

  public getpractioner(data: any): Observable<any>{
    this.practionerlist = [];
    return this.http.get('http://hapi.fhir.org/baseR4/Practitioner?_pretty=true').pipe(map((data:any) => {
      try {
          let responseJSon = data;

          if(data && data.entry){
            data.entry.forEach(pract => {
              let practioner:practioner = {
                detailurl: 'unknown',
                name: 'unknown',
                id: pract.resource.id,
                role: 'unknown',
                identifier: 'unknown',
                gender: 'unknown',
                day: 'unknown'
              }
              practioner.detailurl = pract.fullUrl;
              pract = pract.resource;

              
              let name = ''
              // name = pract.name ? ((pract.name && pract.name[0].family) ? pract.name[0].family : ''+' '+ (pract.name[0].given && pract.name[0].given[0]) ? pract.name[0].given[0] : ''+ ' '+ (pract.name[0].given && pract.name[0].given[1]) ? pract.name[0].given[1] : '') : '';
              let familynamme = (pract.name && pract.name[0].family) ? pract.name[0].family : '';
              let forename =(pract.name && pract.name[0].given && pract.name[0].given[0]) ? pract.name[0].given[0] : '';
              let surname = (pract.name && pract.name[0].given && pract.name[0].given[1]) ? pract.name[0].given[1] : '';
              name = familynamme+' '+forename+' '+surname;

              practioner.name = name;
              practioner.gender = pract.gender ? pract.gender:'unknown';
              practioner.identifier = pract.identifier && pract.identifier[0] ? pract.identifier[0].value : '';

              // let datee = new  Date ("2020-06-18T15:30:00.000+05:30");
              // var today = (datee).getDay();
              // practioner.day = today;


              this.practionerlist.push(practioner);       
            });
          }



          return this.practionerlist;
      } catch (e) {
          throw (<Error>e).message + ' in API response ';
      }
  }));
  }

  public getDetailPractioner(data: any): Observable<any>{
    return this.http.get(this.practionerUrl).pipe(map((data: any)=>{
      if(data){
        this.practionerDetail.birthdate = data.birthDate ? data.birthDate : 'unknown';
        this.practionerDetail.gender = data.gender ? data.gender : 'unknown';
        this.practionerDetail.id = data.id ? data.id : 'unknown';
        this.practionerDetail.name = this.practDetail.name;
        this.practionerDetail.role = data.resourceType ? data.resourceType : 'unknown';
        this.practionerDetail.identifier = this.practDetail.identifier ? this.practDetail.identifier : 'unknown';
      }
      return this.practionerDetail;
    }));
  }






  // public getPractionerRole(url: any){
  //   return this.http.get('http://hapi.fhir.org/baseR4/PractitionerRole?_pretty=true').pipe(map((data:any) => {
  //     if(data && data.entry){
  //       data.entry.forEach(pract => {
  //         let practioner:any = {
  //           speciality: ''
  //         }
  //         practioner.speciality = pract.speciality;
  //         // practioner.detailurl = pract.fullUrl;
  //         // pract = pract.resource;

          
  //         // let name = ''
  //         // // name = pract.name ? ((pract.name && pract.name[0].family) ? pract.name[0].family : ''+' '+ (pract.name[0].given && pract.name[0].given[0]) ? pract.name[0].given[0] : ''+ ' '+ (pract.name[0].given && pract.name[0].given[1]) ? pract.name[0].given[1] : '') : '';
  //         // let familynamme = (pract.name && pract.name[0].family) ? pract.name[0].family : '';
  //         // let forename =(pract.name && pract.name[0].given && pract.name[0].given[0]) ? pract.name[0].given[0] : '';
  //         // let surname = (pract.name && pract.name[0].given && pract.name[0].given[1]) ? pract.name[0].given[1] : '';
  //         // name = familynamme+' '+forename+' '+surname;

  //         // practioner.name = name;
  //         // practioner.gender = pract.gender ? pract.gender:'';
  //         // practioner.identifier = pract.identifier && pract.identifier[0] ? pract.identifier[0].value : '';


  //         this.practionerRolelist.push(practioner);       
  //       });
  //     }
  // }));
    
  // }
}
