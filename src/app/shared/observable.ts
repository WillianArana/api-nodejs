export class Observable {

  private observers!: any[];
  constructor() {
    this.observers = [];
  }

  subscribe(f: any): void {
    this.observers.push(f);
  }

  unsubscribe(f: any): void {
    this.observers = this.observers.filter((subscriber) => subscriber !== f);
  }

  notify(data: any): void {
    this.observers.forEach((observer) => observer(data));
  }
}
