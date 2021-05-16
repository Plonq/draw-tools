import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {Model} from "./app.model";

@Injectable()
export class AppService {
  private currentModelSubject = new BehaviorSubject<Model>(null);
  public currentModel$ = this.currentModelSubject.asObservable();

  constructor() {
  }

  loadModel(model: Model) {
    this.currentModelSubject.next(model);
  }
}
