

export class Products<T>{
  dao:T
  /**
   *
   */
  constructor(dao:T) {
   this.dao = dao 
  }
}
