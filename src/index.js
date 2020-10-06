import React, { Component } from 'react';
import styles from './app.css';
import Window from './Window';
import TopMenu from './TopMenu';
import PropTypes from 'prop-types';

// Third party icon Library
import 'remixicon/fonts/remixicon.css'

/**
 * The main component of the aplication. It controls all other windows.
 *
 * @component
 */
class Desktop extends Component {


    windowSpaceSize = [];

    // State Variables of Desktop Component
    state = {
        // Opened Windows 
        windows: [
        ],
        baseStyles: styles.desktop,

    }

    componentDidMount() {

        this.calculateWindowSpaceSize();
        window.addEventListener('resize', this.calculateWindowSpaceSize.bind(this));

    }

    calculateWindowSpaceSize() {

        this.windowSpaceSize[0] = this.windowSpace.clientHeight;
        this.windowSpaceSize[1] = this.windowSpace.clientWidth;

        //console.log(this.windowSpaceSize[0]);

    }

    // When the user clicks some menu option - open window...
    openWindowHandler = (option, e) => {

        let w = this.state.windows;

        // Title of window must be unique
        if (!w.find(x => x.title === option.name)) {

            w.push({ title: option.name, id: this.state.windows.length + 1, icon: option.icon, height: option.height, width: option.width, component: option.component })

            this.setState({
                windows: w
            })

        }

    }

    // When the user clicks on close button
    closeWindowHandler = (title) => {


        this.setState((curState) => {
            return {
                windows: curState.windows.filter((window) =>
                    window.title !== title)
            }
        })


    }


    // When the user selects some window
    windowSelectedHandler = (title) => {

        // Bringing window to front
        let w = this.state.windows;

        // Title of window must be unique
        const index = w.findIndex(x => x.title === title);

        for (let cont = 0; cont < this.state.windows.length; cont++) {

            if (w[cont].id > w[index].id) {
                w[cont].id--;
            }
        }

        w[index].id = this.state.windows.length;
        w[index].minimized = false;

        this.setState({
            baseStyles: styles.desktop + " " + styles.disable_selection,
            windows: w
        })

    }


    windowReleaseHandler = (title) => {

        this.setState({
            baseStyles: styles.desktop
        })

    }


    openChildWindow(e) {
        console.log(e);
    }


    startLoading(title) {


        let w = this.state.windows;

        // Title of window must be unique
        const index = w.findIndex(x => x.title === title);

        w[index].loading = true;


        this.setState({
            windows: w
        })

    }

    // Minimize one Window
    minimizeWindow = (title) => {
        let w = this.state.windows;

        // Title of window must be unique
        const index = w.findIndex(x => x.title === title);

        w[index].minimized = true;

        this.setState({
            windows: w
        })
    }

    stopLoading(title) {

        let w = this.state.windows;

        // Title of window must be unique
        const index = w.findIndex(x => x.title === title);

        w[index].loading = false;


        this.setState({
            windows: w
        })

    }


    render() {
        return (
            <div className={this.state.baseStyles}>

                {/* The menu where can switch modules, open windows and see the alerts */}
                <TopMenu menu_options={this.props.menu_options} user_menu={this.props.user_menu} onWindowSelected={this.openWindowHandler}></TopMenu>


                {/* The Place Where the windows will be shown */}
                <div ref={(divElement) => this.windowSpace = divElement} className={styles.windowsSpace}>
                    {this.state.windows.map((value, index) => {

                        // If the user didn't pass the icon parameter
                        let icon = value.icon ? value.icon : 'ri-terminal-window-fill'

                        return <Window
                            key={value.title}
                            space={this.windowSpaceSize}
                            icon={icon}
                            zindex={value.id}
                            title={value.title}
                            width={value.width != null ? value.width : null}
                            height={value.height != null ? value.height : null}
                            loading={value.loading}
                            minimized={value.minimized != null ? value.minimized : false}
                            onWindowSelected={this.windowSelectedHandler}
                            onWindowClose={this.closeWindowHandler}
                            onWindowMinimize={this.minimizeWindow}
                            onWindowReleased={this.windowReleaseHandler}
                            onChildOpen={this.openWindowHandler}
                            onStartLoading={this.startLoading.bind(this)}
                            onStopLoading={this.stopLoading.bind(this)}
                        >
                            {
                                value.component

                            }</Window>
                    })}
                </div>

                {/* The toolbar to minimize and maximize the windows  */}
                <div className={styles.windowsBar}>
                    <div className={styles.windowsBar_separator}></div>
                    {this.state.windows.map((value, index) => {
                        let icon = value.icon ? value.icon : 'ri-terminal-window-fill'
                        return <div className={styles.windowsBar_item} onClick={this.windowSelectedHandler.bind(this, value.title)} key={value.title} ><i className={styles.windowsBar_item_img  +" "+ icon}></i>{value.title}</div>
                    })}
                    <div style={{ 'clear': 'none' }}></div>
                </div>
            </div>
        );
    }
}

Desktop.propTypes = {
    menu_options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        icon: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            icon: PropTypes.string,
            component: PropTypes.object
        }))
    }))
}

export default Desktop;