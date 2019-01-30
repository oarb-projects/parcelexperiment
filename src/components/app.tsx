// import * as React from "react";
import React, { Component} from "react";

// export class App extends React.Component<any, any> {
  // can be export class App extends Component<any, any>{

export class App extends Component<IProps, IState>{
  constructor(props:{}){
    super(props);

    this.state={
      currentTask:"",
      tasks:[]
    }
  }

  // method in html
  // :void is that it does not returns anything
  // regular javascript  handleSubmit(e)
 public handleSubmit(e:React.FormEvent<HTMLFontElement>):void{
    e.preventDefault();
    this.setState({
      currentTask:"",
      tasks:[
        ...this.state.tasks,
        {
          // _ means private method
          id:this._timeInMilliseconds(),
          value:this.state.currentTask,
          completed:false;
        }
      ]
    })
  }

  public deleteTask(id:number):void{
    // check every single taks inside, if it doesnt equal passed id it passes through, if it is equal to id it removes it
    const filteredTasks: Array<ITask>=this.state.tasks.filter((task:ITask)=>task.id !==id);
    this.setState({
      tasks:filteredTasks
    })
  }

  compare(a, b){
    // greater than 0  — b comes before a
    if (a.id>b.id) return 1;
    // less than 0 — a comes before b
    if (a.id<b.id) return -1;
    // equal to 0  — a and b are left unchanged with respect to each other
    return 0;
  }

  public toggleDone(index:number):void{
    // taking specified task
    let task:ITask[]=this.state.tasks.splice(index,1);
    // changing boolean
    task[0].completed=!task[0].completed;
    // putting it back in tasks now have everything except the changed task an put it  back with ..task
    debugger;
    // const currentTasks:ITask[]=[...this.state.tasks,...task];
    // this.setState({tasks:currentTasks});
    let tasks:ITask[]=[...this.state.tasks,...task];
    // se ordena porque en caso contrario el editado quedaria al final
    const tasks=tasks.sort(this.compare);
    this.setState({tasks});
  }


  
  // RETUNRS JSX ELEMENT
  public renderTasks():JSX.Element[]{
    return this.state.tasks.map((task:ITask,index:number)=>{
      return(
        // key comes from map
        <div key={task.id} className="tdl-task">
            <span className={task.completed ? "is-completed" : ""}>{task.value}</span>
            <button onClick={()=>this.deleteTask(task.id)}>Delete</button>
            <button onClick={()=>this.toggleDone(index)}>{task.completed ? "Undo" : "Done"}</button>
        </div>
      )
    })
  }
  // if a method is going to be in the html or displayed html its a public function if it isnt its a private
  public render():JSX.Element[] {
    console.log(this.state);
    return (
      <React.Fragment>
        {/* se puede poner un fragment si no quieres que el div en el cual envuelves todo aparezca en el html */}
        <h1>Hello, {this.props.name}, your Todo List</h1>
        <form onSubmit={(e)=>this.handleSubmit(e)}>
          <input type="text" 
          className="tdl-input"
          placeholder="Add a Task"
          value={this.state.currentTask}
          onChange={e=>this.setState({currentTask:e.target.value})}/>
          <button type="submit">Add Task</button>
        </form>
        <section>{this.renderTasks()}</section>
      </React.Fragment>
    )
  }
  // export class App extends React.Component<Iprops, {}> {
  // first any is for props
  // second any is for state
  private _timeInMilliseconds():number{
    const date:Date= new Date();
    return date.getTime();
  }
}

interface IProps {
  name: string;
}
interface IState{
  currentTask:string;
  tasks:Array<ITask;
}
interface ITask{
  id:Number;
  value:string;
  completed:boolean;
}