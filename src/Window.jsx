import React, { Component } from 'react';
import styles from './app.css';
import PropTypes from 'prop-types';

class Window extends Component {


    state = {
        // Position
        top: 10,
        left: 10,
        classes: styles.window_border_ext,
        // Size
        height: 300,
        width: 300,
        // Maximized
        maximized: false,
        height_max: 0,
        width_max: 0,

    }

    // Movement Control Variables
    lastX;
    lastY;
    lock = true;


    width_margins = 1;


    // Styles object
    styles = () => {

        let s = {
            position: 'absolute',
            left: !this.state.maximized ? this.state.left + 'px' : 0 + 'px',
            top: !this.state.maximized ? this.state.top + 'px' : 0 + 'px',
            zIndex: this.props.zindex,
            display: this.props.minimized ? 'none' : 'block'

        }
        return s;
    }


    componentDidMount() {

        let height = this.props.space[0] - 60;
        let height_max = this.props.space[0] - 37;
        let top = 10;
        if (this.props.height != null) {
            height = this.props.height;
            top = (this.props.space[0] - 38) / 2 - (height) / 2;
        }

        let width = this.props.space[1] - 20 - this.width_margins;
        let width_max = this.props.space[1] - this.width_margins;
        let left = 10;
        if (this.props.width != null) {
            width = this.props.width;
            left = this.props.space[1] / 2 - width / 2;
        }

        this.setState({
            height: height,
            width: width,
            height_max: height_max,
            width_max: width_max,
            left: left,
            top: top
        });

    }

    // A Method that moves the window
    moveWindowHandler = (e) => {

        if (!this.lock) {
            

            let newY;
            let newX;

            const diffX = e.pageX - this.lastX;
            const diffY = e.pageY - this.lastY;

            let newClasses = this.state.classes;

            // Lock only for larger moviments
            if(diffX > 0 || diffY > 0){
                newClasses = styles.window_border_ext + " " + styles.lock + " "+ styles.disable_selection
            }

            // Top limit
            newY = this.state.top + diffY;
            if (newY < 0) {
                newY = 0
            }

            // Bottom Limit
            if (newY + this.state.height + 38 > this.props.space[0]) {
                newY = this.props.space[0] - this.state.height - 38;
            }

            // Left Limit
            newX = this.state.left + diffX;
            if (newX < 0) {
                newX = 0
            }

            // Right Limit
            if (newX + this.state.width + this.width_margins > this.props.space[1]) {
                newX = this.props.space[1] - this.state.width - this.width_margins;
            }



            this.lastX = e.pageX;
            this.lastY = e.pageY;


            this.setState({
                top: newY,
                left: newX,
                classes: newClasses
            })


        }
    }

    // When the user clicks on the window
    mouseDownHandler = (e) => {

        this.props.onWindowSelected(this.props.title);

        this.lastX = e.pageX;
        this.lastY = e.pageY;
        this.lock = false;

        window.addEventListener("mousemove", this.moveWindowHandler);
        window.addEventListener("mouseup", this.mouseUpHandler);



    }

    // When the user release the window (move, resize, etc)
    mouseUpHandler = (e, func) => {

        this.props.onWindowReleased(this.props.title);
        this.lock = true;
        this.setState({
            classes: styles.window_border_ext,
        })

        window.removeEventListener("mousemove", this.moveWindowHandler);
        window.removeEventListener("mouseup", this.mouseUpHandler);

        // Resizes
        window.removeEventListener("mousemove", func);
    }

    closeWindowHandler = (e) => {


        this.props.onWindowClose(this.props.title);
    }

    // Maximize or return to normal size
    maximizeWindowHandler = () => {
        this.setState({
            maximized: !this.state.maximized
        })
    }

    // Minimize the window
    minimizeWindowHandler = () => {

        this.props.onWindowMinimize(this.props.title);

    }

    // When User click (mouse down) in some resizable place
    mouseDownResizeHandler = (pos, e) => {

        this.lastX = e.pageX;
        this.lastY = e.pageY;
        this.lock = false;
        let func;
        switch (pos) {
            case 'bottom-right':
                func = (e) => this.resizeWindowHandler(e, 'bottom-right');
                window.addEventListener("mousemove", func)
                window.addEventListener("mouseup", (e) => this.mouseUpHandler(e, func));
                break;
            case 'bottom-left':
                func = (e) => this.resizeWindowHandler(e, 'bottom-left');
                window.addEventListener("mousemove", func)
                window.addEventListener("mouseup", (e) => this.mouseUpHandler(e, func));
                break;
            case 'right':
                func = (e) => this.resizeWindowHandler(e, 'right');
                window.addEventListener("mousemove", func)
                window.addEventListener("mouseup", (e) => this.mouseUpHandler(e, func));
                break;
            case 'bottom':
                func = (e) => this.resizeWindowHandler(e, 'bottom');
                window.addEventListener("mousemove", func)
                window.addEventListener("mouseup", (e) => this.mouseUpHandler(e, func));
                break;
            case 'top':
                func = (e) => this.resizeWindowHandler(e, 'top');
                window.addEventListener("mousemove", func)
                window.addEventListener("mouseup", (e) => this.mouseUpHandler(e, func));
                break;
            case 'top-right':
                func = (e) => this.resizeWindowHandler(e, 'top-right');
                window.addEventListener("mousemove", func)
                window.addEventListener("mouseup", (e) => this.mouseUpHandler(e, func));
                break;
            case 'top-left':
                func = (e) => this.resizeWindowHandler(e, 'top-left');
                window.addEventListener("mousemove", func)
                window.addEventListener("mouseup", (e) => this.mouseUpHandler(e, func));
                break;
            case 'left':
                func = (e) => this.resizeWindowHandler(e, 'left');
                window.addEventListener("mousemove", func)
                window.addEventListener("mouseup", (e) => this.mouseUpHandler(e, func));
                break;
            default:
                break;


        }


    }

    // Method to handle the multiple types of window resizing
    resizeWindowHandler = (e, direction) => {

        if (!this.lock) {

            let newY;
            let newHeight;
            let newWidth;
            let newX;

            const diffX = e.pageX - this.lastX;
            const diffY = e.pageY - this.lastY;

            newY = this.state.top;
            newX = this.state.left;
            newWidth = this.state.width;
            newHeight = this.state.height;

            // Resizing the Y axios from top
            if (direction === 'top' || direction === 'top-left' || direction === 'top-right') {
                newY = this.state.top + diffY;
                if (newY < 0) {
                    newY = 0
                    newHeight = this.state.height
                } else {
                    newHeight = this.state.height - diffY
                }

                // Bottom Limit
                if (newHeight < 300) {
                    newY = this.state.top;
                    newHeight = this.state.height
                }
            }

            // Resizing the X axios from LEFT
            if (direction === 'left' || direction === 'top-left' || direction === 'bottom-left') {
                newX = this.state.left + diffX;
                if (newX < 0) {
                    newX = 0
                    newWidth = this.state.width
                } else {
                    newWidth = this.state.width - diffX
                }

                // Right Limit
                if (newWidth < 300) {
                    newX = this.state.left;
                    newWidth = this.state.width
                }
            }

            // Resizing the Y axios from Bottom
            if (direction === 'bottom' || direction === 'bottom-left' || direction === 'bottom-right') {
                // Top limit
                newHeight = this.state.height + diffY;
                if (newHeight < 300) {
                    newHeight = this.state.height
                }

                // // Bottom Limit
                if (newHeight + this.state.top + 38 > this.props.space[0]) {
                    newHeight = this.props.space[0] - this.state.top - 38;
                }

            }

            // Resizing the X axios form RIGHT
            if (direction === 'right' || direction === 'top-right' || direction === 'bottom-right') {

                // Left Limit
                newWidth = this.state.width + diffX;
                if (newWidth < 300) {
                    newWidth = 300
                }

                // // Right Limit
                if (newWidth + this.state.left + this.width_margins > this.props.space[1]) {
                    newWidth = this.props.space[1] - this.state.left - this.width_margins;
                }

            }


            this.lastX = e.pageX;
            this.lastY = e.pageY;

            this.setState({
                top: newY,
                height: newHeight,
                left: newX,
                width: newWidth,
                classes: styles.window_border_ext + " " + styles.lock + " " + styles.disable_selection
            })


        }

    }


    windowButtons = () => {

    }



    render() {

        return (
            <div
                style={this.styles()}
                className={this.state.classes}
            >
                <div className={styles.window_border_int}>
                    <div className={styles.container}>
                        <div onMouseDown={!this.state.maximized ? this.mouseDownResizeHandler.bind(this, 'top-left') : null} className={styles.window_border_int_top_left}></div>
                        <div onMouseDown={!this.state.maximized ? this.mouseDownResizeHandler.bind(this, 'top') : null} className={styles.window_border_int_top}></div>
                        <div onMouseDown={!this.state.maximized ? this.mouseDownResizeHandler.bind(this, 'top-right') : null} className={styles.window_border_int_top_right}></div>
                        <div className={styles.clear}></div>
                    </div>
                    <div onMouseDown={!this.state.maximized ? this.mouseDownResizeHandler.bind(this, 'left') : null} className={styles.window_border_int_left}></div>
                    <div onMouseDown={!this.state.maximized ? this.mouseDownResizeHandler.bind(this, 'right') : null} className={styles.window_border_int_right}></div>

                    {/* Titlebar */}
                    <div className={styles.window_titleBar + " " +styles.disable_selection} onMouseDown={!this.state.maximized ? this.mouseDownHandler : null}>
                        {/* Window Icon */}
                        <i className={styles.title_item_img +" "+ this.props.icon}></i>
                        {this.props.title}
                        {this.props.unCloseable ? null : <i onClick={this.closeWindowHandler} className={styles['sprite-window-open'] + " "+styles.window_button}></i>}

                        <i onClick={this.maximizeWindowHandler} className={this.state.maximized ? styles["sprite-window-maximized"] + " "+styles.window_button : styles["sprite-window-maximize"] + " "+ styles.window_button}></i>
                        <i onClick={this.minimizeWindowHandler} className={styles['sprite-window-minimize']+ " "+styles.window_button}></i>
                    </div>
                    <div style={this.state.maximized ? { height: this.state.height_max, width: this.state.width_max } : { height: this.state.height, width: this.state.width }} className={styles.window_data}>

                        {React.Children.map(this.props.children, filho => {
                            return React.cloneElement(filho, { ...this.props })
                        })}
                        {/* If Loading */}
                        {this.props.loading ?
                            <div className={styles.loading_mask}>
                                <div className={styles.loading_label}>
                                    Loading...Please wait!<br />
                                    <img className={styles.loading_image} alt="Carregando..." src="assets/loading.gif"></img>
                                </div>
                            </div> : null}
                    </div>
                    <div className={styles.container}>
                        <div onMouseDown={!this.state.maximized ? this.mouseDownResizeHandler.bind(this, 'bottom-left') : null} className={styles.window_border_int_bottom_left}></div>
                        <div onMouseDown={!this.state.maximized ? this.mouseDownResizeHandler.bind(this, 'bottom') : null} className={styles.window_border_int_bottom}></div>
                        <div onMouseDown={!this.state.maximized ? this.mouseDownResizeHandler.bind(this, 'bottom-right') : null} className={styles.window_border_int_bottom_right}></div>
                        <div className={styles.clear}></div>
                    </div>


                </div>

            </div >
        );
    }
}


// Defining the types required by the object Window 
Window.propTypes = {
    children: PropTypes.element.isRequired,
    space: PropTypes.arrayOf(PropTypes.number),
    zindex: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    title: PropTypes.string,
    unCloseable: PropTypes.bool,
    icon: PropTypes.string
}

export default Window;