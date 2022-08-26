 import { Injectable } from '@angular/core';
 import { Subject } from 'rxjs';
 import { Preferences } from '../interfaces/preferences.interface';

 @Injectable({
   providedIn: 'root'
 })
 export class PrefFormService {

   formChangedSubject: Subject<Preferences> = new Subject();

   constructor() { }

 }


