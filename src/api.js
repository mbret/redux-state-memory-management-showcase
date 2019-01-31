import faker from "faker"

class Api {
  constructor() {
    this.db = Array(9999).fill(null).map((_) => ({
      id: faker.random.uuid(),
      title: faker.name.title(),
      content: faker.name.jobDescriptor(),
    }));
  }

  getIds() {
    return Promise.resolve(this.db.reduce((obj, item) => {
      obj.push(item.id)
  
      return obj
    }, []))
  }

  getItem(id) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.db.find(item => item.id === id))
      }, 2000)
    })
  }
}

export const api = new Api()