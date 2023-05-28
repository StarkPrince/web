import { AxiosPromise, AxiosResponse, AxiosError } from "axios";

interface ModelAtrributes<T> {
  set(update: T): void;
  getAll(): T;
  get<K extends keyof T>(key: K): T[K];
}

interface Sync<T> {
  fetch(id: number): AxiosPromise;
  save(data: T): AxiosPromise;
}

interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

export interface HasId {
  id?: number;
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAtrributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  on = this.events.on;
  trigger = this.events.trigger;
  get = this.attributes.get;

  set(update: T): void {
    this.attributes.set(update);
    this.events.trigger("change");
  }

  fetch(): void {
    const id = this.attributes.get("id");
    if (typeof id !== "number") {
      throw new Error("Cannot fetch without an id");
    }
    this.sync
      .fetch(id)
      .then((response: AxiosResponse): void => {
        this.set(response.data);
      })
      .catch((err: AxiosError): void => {
        throw new Error(err.message);
      });
  }

  save(): void {
    console.log("insave");
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger("save");
      })
      .catch((err: AxiosError): void => {
        this.trigger("error");
      });
  }
}
