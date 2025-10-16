import React,{Component} from 'react';
import './App.css';
import HeaderContainer from './HeaderContainer/HeaderContainer';
import Task from './Task/Task';
import CreateTask from './CreateTask/CreateTask';
import axios from 'axios';

class App extends Component {
  constructor(){
    super()
    this.state = {
      showModal : false,
      newTaskValue : '',
      newTaskError : '',
      tasksList : []
    }
    this.taskListUrl = 'http://localhost:8000/todo/list/'
    this.taskcreateUrl = 'http://localhost:8000/todo/create/'
    this.taskDeleteUrl = 'http://localhost:8000/todo/delete/'
    this.closeModal = this.closeModal.bind(this)
    this.openModal = this.openModal.bind(this)
    this.doneTask = this.doneTask.bind(this)
    this.removeTask = this.removeTask.bind(this)
    this.changeInput = this.changeInput.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }
  componentDidMount(){
    this.getListTasks()
    
  }
  getListTasks = async ()=>{
    await axios.get(this.taskListUrl).then(res=>{
      this.setState({tasksList:res.data.map(task=>({...task,isDone:false,isRemoving:false}))});
    }).catch(res=>{
      this.setState({newTaskError:res.message})
    })
    // await fetch(this.taskListUrl).then(res=>{
    //   if (!res.ok){
    //     throw res.statusText
    //   }
    //   return res.json()
    // }).then(res=>{    
    //   this.setState({tasksList:res.map(task=>({...task,isDone:false,isRemoving:false}))});
    // })
  }
  createNewTask = async ()=>{
  //   await axios.post(this.taskcreateUrl,{'title':this.state.newTaskValue}).then(res=>{
  //     this.setState(preState=>{
  //       const newTask = {...res.data,isDone:false,isRemoving:false}
  //       return {tasksList:[newTask,...preState.tasksList],showModal:false,newTaskValue:''}
  //   })
  // }).catch(res=>{
  //   this.setState({newTaskError:res.response.data.title[0]})
  // })
    await fetch(this.taskcreateUrl,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        title:this.state.newTaskValue
      })
    }).then(res=>{
      if (!res.ok) {
        return res.json().then(err=>{
          let err_message = err.title[0]
          throw new Error(err_message)
        })
      }
      return res.json()
    }).then(res=>{
      this.setState(preState=>{
        const newTask = {...res,isDone:false,isRemoving:false}
        return {tasksList:[newTask,...preState.tasksList],showModal:false,newTaskValue:''}
      })
      
    }).catch(res=>{
      this.setState({newTaskError:res.message})
    })
  }
  closeModal(event){
    
    if (!event.target.closest('.create-task-container')){
      this.setState({showModal:false})
    }    
  }
  openModal(e){
    e.stopPropagation()
    
    if(this.state.showModal===false){      
      this.setState({showModal:true})
    }
  }
  doneTask(id){
    this.setState({tasksList:this.state.tasksList.map(task=>task.id===id?{...task,isDone:true}:task)})
  }
  removeTask= async (id)=>{
    // let responce = await fetch(this.taskDeleteUrl+id,{method:'DELETE'}).then(res=>res.json()).then(res=>res['todos'])
    let response = await axios(this.taskDeleteUrl+id,{method:'DELETE'}).then(res=>res.data['todos'])
    this.setState({tasksList:this.state.tasksList.map(task=>task.id===id?{...task,isRemoving:true}:task)})        
    setTimeout(() => {
      this.setState({tasksList:response.map(task=>({...task,isRemoving:false,isDone:false}))})
    }, 300);
  }
  changeInput(e){
    this.setState({newTaskValue:e.target.value,newTaskError:''})
  }
  formSubmit(e){
    e.preventDefault()
    if(this.state.newTaskValue===''){
      this.setState({newTaskError:'please enter task name'})      
    }
    else{
      console.log(this.createNewTask())
    }
    // const newTask = {
    //   id:'5',title:this.state.newTaskValue,isRemoving:false,isDone:false
    // }
    // this.setState(prevState=>{
    //   return {tasksList:[newTask,...prevState.tasksList],showModal:false}
    // })
  }
  render(){    
      return (        
    <div className={'App'+`${this.state['showModal']?' modal-open':''}`} onClick={this.closeModal} ref={this.ParrentRef}>
      <HeaderContainer onclick={this.openModal}></HeaderContainer>
      <div className='breake-line'></div>
      <CreateTask {...this.state} changeHandler={this.changeInput} formSubmit={this.formSubmit}></CreateTask>
      <div className='tasks-list'>
        {this.state.tasksList.map(task=>
          <Task key={task.id} {...task} doneHandler={this.doneTask} removeHandler={this.removeTask}></Task>
          )}
      </div>
    </div>
  )
  }
}

export default App;
