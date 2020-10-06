import React, { Component } from 'react'
import ExampleChild from './example_child'

export default class Example extends Component {


    loadingMaskExample (){
        
        // Showing the loading mask
        this.props.onStartLoading('Examples')
        setTimeout(
            // Hidding the loading mask
            () => this.props.onStopLoading('Examples'), 
            3000
          );
    };

    render() {
        return (
            <div>
                {/* // Minimize Some Window */}
                <button onClick={() =>this.props.onWindowMinimize('Examples')}>Minimize</button>

                {/* // Select some window */}
                <button onClick={() =>this.props.onWindowSelected('Examples')}>Selected</button>

                {/* // Opening a new Window with size of 600x200 */}
                <button onClick={() =>this.props.onChildOpen({ 'name': 'Example - Child', width: 600, height: 200, 'component': <ExampleChild></ExampleChild>})}>Open New Window</button>

                {/* // Closing some window */}
                <button onClick={() =>this.props.onWindowClose('Examples')}>Close</button>

                {/* // Closing some window */}
                <button onClick={() =>this.loadingMaskExample()}>Loading Mask (3 seconds)</button>

            </div>
        )
    }
}
