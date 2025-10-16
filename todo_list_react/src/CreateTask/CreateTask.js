import { Component } from "react";
import './CreateTask.css'


class CreateTask extends Component {
    constructor(props) {
        super(props);
    }
    render() { 
        
        return (
            <form className={`create-task-container ${this.props.showModal&&'show'}`} onSubmit={this.props.formSubmit}>
                <p className="title">CREATE TASK</p>
                <div className="input-container">
                <input type="text" placeholder="Task..." className={this.props.newTaskError&&'error'} onInput={this.props.changeHandler} value={this.props.newTaskValue}></input>
                {this.props.newTaskError&&<span>
                    {this.props.newTaskError}
                    </span>}
                </div>
                <button type="submit" className="add-btn">create</button>
            </form>
        );
    }
}
 
export default CreateTask;