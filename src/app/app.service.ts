import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ModelDefinition } from "./app.model";

@Injectable()
export class AppService {
  private currentModelSubject = new BehaviorSubject<ModelDefinition>(null);
  public currentModel$ = this.currentModelSubject.asObservable();
  public modelLoading$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  loadModel(model: ModelDefinition) {
    this.currentModelSubject.next(model);
  }
}
