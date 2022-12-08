import { Queue } from "./queue"

let countItems = 0 ;
const queue = new Queue()

// Adding an item for each three seconds
const addinInterval = setInterval(() => {
  const item = {
    timestamp: Date.now()
  }
  console.log('Adding: ', item)
  queue.add(item)
  countItems++;
  if(countItems == 5) {
    clearTimeout(addinInterval)
  }
},3000)

// Remove an item randomly  
const removingInterval = setInterval(() => {
  const item = queue.get()
  console.log('removing: ', item)
  // randomTime = await Math.round(Math.random()*(3000-500))+5; // generate new time (between 3sec and 500"s)
  
  if(queue.info().queueLength == 0 && countItems == 5) {
    clearTimeout(removingInterval)
  }
},3500)


