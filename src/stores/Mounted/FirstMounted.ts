import { makeAutoObservable } from "mobx";

export class FirstMounted {
  isMounted: boolean = false;
  constructor() {
    makeAutoObservable(this);
    this.isMounted = true;
  }

  get mounted() {
    return this.isMounted;
  }
}
