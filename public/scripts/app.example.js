class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("main-content");
    this.testButton = document.getElementById("test-btn")
    this.driverQuery = document.getElementById("driverType")
    this.dateQuery = document.getElementById("date")
    this.timeQuery = document.getElementById("time")
    this.capacityQuery = document.getElementById("capacity")
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;


  }

 async filter(){
    const  driverType = (app.driverQuery.value === "true")
    console.log(driverType)
    const  date = new Date(app.dateQuery.value);
    date.setHours(app.timeQuery.value);
    console.log(app.dateQuery.value)
    console.log(app.timeQuery.value)
    console.log (date)
    const  capacity = app.capacityQuery.value
    console.log(capacity)
    console.log(driverType)
    const cars = await Binar.listCars((obj =>{
      if(capacity.length >= 1){
        return obj.available === driverType &&
               obj.availableAt <= date &&      
               obj.capacity >= capacity
      }else{
        return obj.available === driverType &&
               obj.availableAt <= date 
      }
      
    }));
    // const filteredCars = cars.filter((obj) =>{
    //   return obj.capacity >= capacity &&
    //          obj.availableAt <= date;        
    // })
    console.log(capacity.length)
    Car.init(cars);
    console.log(Car.list)
  }


  run  = () => {
    const isEmpty = Object.values(Car.list).length === 0
    if(!isEmpty){
      Car.list.forEach((car) => {
        const node = document.createElement("div");
        node.classList.add('col-md-4')
        node.classList.add('col-sm-6')
        node.classList.add('mb-3')
        node.innerHTML = car.render();
        this.carContainerElement.appendChild(node);
      });
    }else{
      const car = new Car(Car.init);
      const node = document.createElement("div");
      node.innerHTML = car.isEmpty();
      this.carContainerElement.appendChild(node);
        
    }
    
    console.log (car)
   
  };

  async load() {
   
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };

  test = () => {
    const node = document.createElement("div");
    this.ContainerElement.innerHTML = JSON.stringify.node + '<h1>CREATED.</h1>';
  }
  
}
