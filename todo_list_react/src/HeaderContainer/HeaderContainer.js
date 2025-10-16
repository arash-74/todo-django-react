import React from "react";
import NewTaskBtn from "../NewTaskBtn/NewTaskBtn";
import './HeaderContainer.css'

export default class HeaderContainer extends React.Component{
    constructor(prop){
        super(prop)
    }
    render(){
        
        return(
            <div className="header-container">
                <div className='title'>TODO LIST</div>
                <NewTaskBtn onclick={this.props.onclick}></NewTaskBtn>
            </div>
        )
    }
}
