class QueueError {

  public static indexNotExists = () => {
    throw new Error('Index not exists')
  }
}


export class Queue {
  queue: any[any] = []
  name: string = 'default'

  constructor(name: string = 'default') {
    this.name = name;
    this.queue[this.name] = [];
  }

  private getCurrentQueue = () => {
    return this.queue[this.name]
  }

  private getQueueLength = () => {
    return this.getCurrentQueue()?.length;
  }

  private getQueueLastIndex = () => {
    return this.getQueueLength() - 1;
  }

  public add = (item: any) => {
    return this.queue[this.name].push(item);
  }

  public remove = (index: number) => {
    // TODO: Use decorator to implement a check index behavior
    if(!this.getCurrentQueue()[index]) {
      return QueueError.indexNotExists()
    }
    const idx = this.getQueueLastIndex()
    // delete this.queue[this.name][idx]; // [ <1 empty item> 
    this.queue[this.name] = this.queue[this.name].filter((_itm,i) => idx !== i);
    return this.getCurrentQueue().length;
  
  }
  
  public get = () => {
    const queueLength = this.getQueueLength();
    if(queueLength) {
      const index = this.getQueueLastIndex()
      const item = this.getCurrentQueue()[index];
      this.remove(index)
      return item;
    }
    return {}
  }


  public info = () => {
    const queueLength = this.getQueueLength();
    return {
      queueLength,
    }
  }
}




