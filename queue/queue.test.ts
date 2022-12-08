import { Queue } from '../queue/queue';

describe('Basic Queue tests', () => {
  test('Instance test', () => {
    const q = new Queue()
    const info = q.info()
    expect(info.queueLength).toBe(0);
    // Check the methods if method add, remove, get exists
  });

  test('Add and remove an item to queue', () => {
    const q = new Queue()
    let info = q.info()
    expect(info.queueLength).toBe(0);

    const item = { abc: 567 }
    q.add(item)
    info = q.info()
    expect(info.queueLength).toBe(1);
    
    const itemFromQueue = q.get()
    info = q.info()
    expect(itemFromQueue.abc).toBe(567);
    expect(info.queueLength).toBe(0);
    
  });


});