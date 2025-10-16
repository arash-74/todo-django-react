import React from 'react'
import './NewTaskBtn.css'

class NewTaskBtn extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className='button' onClick={this.props.onclick}>
                <span>+</span>
            </div>
        )
    }
}
export default NewTaskBtn