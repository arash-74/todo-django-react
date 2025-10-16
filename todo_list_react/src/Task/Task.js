import React from "react";
import './Task.css'

export default class Task extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        let{id,title,isRemoving,isDone,doneHandler,removeHandler}=this.props
        
        return(
            <div className={`task-container ${isRemoving?'removing':''}`}>
            <div className={`done-filter-container ${isDone?'done':''}`}>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
                <div className="hachure"></div>
            </div>
                <p className="task-name">{title}</p>
                <div className="control-btns">
                    <button className={`done-btn ${isDone?'done':''}`} onClick={()=>doneHandler(id)}>Done</button>
                    <button className="remove-btn" onClick={()=>removeHandler(id)}>Remove</button>
                </div>
            </div>
        )
    }
}