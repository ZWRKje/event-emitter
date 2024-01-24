// вместо этого я бы какой нибудь uuid из npm взял бы
function idGenerator(): number {
  const time = Date.now();
  console.log(''); // костыль для того что бы время успевало измениться
  return time;
}

export class EventSubscriber {
  private _id: number;
  private event: Function;

  constructor(event: Function) {
    this._id = idGenerator();
    this.event = event;
  }
  public get id(): number {
    return this._id;
  }
  public callEvent(payload?: any) {
    this.event(payload);
  }
}
