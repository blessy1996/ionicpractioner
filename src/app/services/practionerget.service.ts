import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { practioner, practionerDetail, practionerRoleModal, medicationRequest } from '../modal/practionerlistmodel'

@Injectable({
  providedIn: 'root'
})
export class PractionergetService {

  practionerlist: practioner[] = [];
  practionerDetail: practionerDetail = {
    name: 'unknown',
    id: null,
    role: 'unknown',
    identifier: 'unknown',
    speciality: '',
    birthdate: '',
    gender: ''
  }

  practDetail1: practioner;


  constructor(
    private http: HttpClient) { }

  public getpractioner(data: any): Observable<any> {
    this.practionerlist = [];
    return this.http.get('http://hapi.fhir.org/baseR4/Practitioner?_pretty=true').pipe(map((data: any) => {
      try {

        if (data && data.entry) {
          data.entry.forEach(pract => {
            let practioner: practioner = {
              detailurl: '',
              name: 'unknown',
              id: pract.resource.id,
              role: 'unknown',
              identifier: 'unknown',
              gender: '',
              day: ''
            }
            practioner.detailurl = pract.fullUrl;
            pract = pract.resource;


            let name = ''
            let familynamme = (pract.name && pract.name[0].family) ? pract.name[0].family : '';
            let forename = (pract.name && pract.name[0].given && pract.name[0].given[0]) ? pract.name[0].given[0] : 'unknown';
            let surname = (pract.name && pract.name[0].given && pract.name[0].given[1]) ? pract.name[0].given[1] : '';
            name = familynamme + ' ' + forename + ' ' + surname;

            practioner.name = name;
            practioner.gender = pract.gender ? pract.gender : 'unknown';
            practioner.identifier = pract.identifier && pract.identifier[0] ? pract.identifier[0].value : '';

            this.practionerlist.push(practioner);
          });
        }



        return this.practionerlist;
      } catch (e) {
        throw (<Error>e).message + ' in API response ';
      }
    }));
  }

  public getDetailPractioner(data: any): Observable<any> {
    this.practDetail1 = JSON.parse(localStorage.getItem('data'));
    return this.http.get(data).pipe(map((data: any) => {
      if (data) {
        this.practionerDetail.birthdate = data.birthDate ? data.birthDate : 'unknown';
        this.practionerDetail.gender = data.gender ? data.gender : 'unknown';
        this.practionerDetail.id = data.id ? data.id : 'unknown';
        this.practionerDetail.name = this.practDetail1.name ? this.practDetail1.name : '';
        this.practionerDetail.role = data.resourceType ? data.resourceType : 'unknown';
        this.practionerDetail.identifier = this.practDetail1.identifier ? this.practDetail1.identifier : 'unknown';
      }
      localStorage.setItem('detaildata', JSON.stringify(this.practionerDetail));
      return this.practionerDetail;
    }));
  }

  public getPractionerRole(data: any): Observable<any> {
    let practurl = 'http://hapi.fhir.org/baseR4/PractitionerRole?_pretty=true';
    

      let practDetailUrl = JSON.parse(localStorage.getItem('data'));


    return this.http.get(`${practurl}&practitioner=Practitioner/${practDetailUrl.id}&_include=PractitionerRole:practitioner`).pipe(map((data: any) => {
      let practionerRole: practionerRoleModal = {
        name: 'unknown',
        speciality: 'unknown',
        photo: null,
        identifier: 'unknown'
      }
      if (data && data.entry) {
        data.entry.forEach(pract => {

          pract = pract.resource;
          let name = ''
          let familynamme = (pract.name && pract.name[0].family) ? pract.name[0].family : '';
          let forename = (pract.name && pract.name[0].given && pract.name[0].given[0]) ? pract.name[0].given[0] : 'unknown';
          let surname = (pract.name && pract.name[0].given && pract.name[0].given[1]) ? pract.name[0].given[1] : '';
          name = familynamme + ' ' + forename + ' ' + surname;
          practionerRole.name = name;
          let imgdata = ''
          practionerRole.photo = pract.photo && pract.photo[0] && pract.photo[0].data ? pract.photo[0].data : 'unknown';
          imgdata = practionerRole.photo;
          practionerRole.identifier = pract.identifier && pract.identifier[0] && pract.identifier[0].value ? pract.identifier[0].value : 'unknown';

          practionerRole.speciality = pract.specialty && pract.specialty[0] && pract.specialty[0].coding && pract.specialty[0].coding[0] && pract.specialty[0].coding[0].display ? pract.specialty[0].coding[0].display : 'unknown';
        });
      }
     
      return practionerRole;
    }));

  }

  public getMedicationRequest(data: any): Observable<any> {
    
    let practurl = 'http://hapi.fhir.org/baseR4/MedicationRequest'
    let include = '&_include=MedicationRequest:encounter&_include=MedicationRequest:intended-dispenser&_include=MedicationRequest:intended-performer&_include=MedicationRequest:medication&_include=MedicationRequest:patient&_include=MedicationRequest:requester&_include=MedicationRequest:subject&_pretty=true'
    let practDetailUrl = JSON.parse(localStorage.getItem('data'));
    return this.http.get(`${practurl}?requester=${practDetailUrl.id}${include}`).pipe(map((data: any) => {

      let medicationRequest: medicationRequest[] = [];

      if (data && data.entry) {
        data.entry.forEach(medication => {
          let mediRequest: medicationRequest = {
            medicationName: '',
            medId: null,
            route: '',
            doselow: '',
            dosehigh: ''
          }
          medication = medication.resource;
          mediRequest.medId = medication.id ? medication.id : '';
          let route = medication.dosageInstruction
            && medication.dosageInstruction[0]
            && medication.dosageInstruction[0].route
            && medication.dosageInstruction[0].route.coding
            && medication.dosageInstruction[0].route.coding[0]
            && medication.dosageInstruction[0].route.coding[0].display ? medication.dosageInstruction[0].route.coding[0].display : '';

          mediRequest.route = route;
          mediRequest.doselow = medication.dosageInstruction
            && medication.dosageInstruction[0]
            && medication.dosageInstruction[0].doseAndRate
            && medication.dosageInstruction[0].doseAndRate[0].doseRange
            && medication.dosageInstruction[0].doseAndRate[0].doseRange.low
            && medication.dosageInstruction[0].doseAndRate[0].doseRange.low.value ? medication.dosageInstruction[0].doseAndRate[0].doseRange.low.value : '';

          mediRequest.dosehigh = medication.dosageInstruction
            && medication.dosageInstruction[0]
            && medication.dosageInstruction[0].doseAndRate
            && medication.dosageInstruction[0].doseAndRate[0].doseRange
            && medication.dosageInstruction[0].doseAndRate[0].doseRange.high
            && medication.dosageInstruction[0].doseAndRate[0].doseRange.high.value ? medication.dosageInstruction[0].doseAndRate[0].doseRange.high.value : '';


         

          mediRequest.medicationName = medication && medication.contained && medication.contained[0] && medication.contained[0].code && medication.contained[0].code.coding && medication.contained[0].code.coding[0] && medication.contained[0].code.coding[0].display ? medication.contained[0].code.coding[0].display : 'unknown';


          medicationRequest.push(mediRequest)
        });

      }


      
      return medicationRequest;
    }));
  }

}
