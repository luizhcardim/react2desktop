import React, { Component } from 'react';
import styles from './app.css';
import PropTypes from 'prop-types';


/**
 * The top menu of the desktop
 */
class TopMenu extends Component {

    state = {
        topMenu: false,
        userMenu: false,
        selectedModule: 0,
        selectedButton: null
    }

    // When the user clicks some window option
    openWindowHandler = (option, e) => {

        this.props.onWindowSelected(option)

    }

    // When the user clicks the module button
    openModulesHandler = (e) => {

        if (this.state.topMenu === false) {
            document.addEventListener("click", this.openModulesHandler);
        } else {
            document.removeEventListener("click", this.openModulesHandler);
        }

        this.setState(
            { topMenu: this.state.topMenu ? false : true }
        )
    }

    // When the user clicks the user menu button
    openUserMenuHandler = (e) => {

        if (this.state.userMenu === false) {
            document.addEventListener("click", this.openUserMenuHandler);
        } else {
            document.removeEventListener("click", this.openUserMenuHandler);
        }

        this.setState(
            { userMenu: this.state.userMenu ? false : true }
        )
    }

    // When the user selects one module
    selectModuleHandler = (id) => {
        this.setState(
            { selectedModule: id }
        )
    }


    renderMenuItemOptions(value, index) {
        return (<div className={styles.topmenu_item_button_options}>{value.items.map((v2, id) => (
            <div onClick={this.openWindowHandler.bind(this, v2)} key={'submenu' + id} className={styles.topmenu_item_button_options_item}>{v2.name}</div>
        ))}</div>)
    }





    renderMenuItem(value, index) {



        if (value.items) {

            let menuOptions = null
            if (value.name === this.state.selectedButton) {
                menuOptions = this.renderMenuItemOptions(value, index);
            }

            return (<div onClick={() => this.handleButtonClick(value.name)} onMouseOver={this.state.selectedButton != null ? () => this.handleButtonOver(value.name) : null} className={styles.topmenu_item_button} key={index} >{value.name}
                <i className={styles.topmenu_item_button_arrow+" ri-arrow-drop-down-line"}></i>

                {menuOptions}



            </div>
            );
        } else {
            return (<div className={styles.topmenu_item_button} onClick={this.openWindowHandler.bind(this, value)} key={value.name} >{value.name}</div>);
        }

    }

    // this Method will render all the buttons of the selected module
    renderMenuOptions() {

        return this.props.menu_options[this.state.selectedModule]['items'].map((value, index) => {
            // Has children?
            return this.renderMenuItem(value, index);
        })
    }

    handleButtonClick = (btn) => {
        document.addEventListener("click", this.clearButtonSelection);
        this.setState({
            selectedButton: btn
        })
    }

    handleButtonOver = (btn) => {
        this.setState({
            selectedButton: btn
        })
    }

    clearButtonSelection = () => {
        document.removeEventListener("click", this.clearButtonSelection);
        this.setState({
            selectedButton: null
        })
    }


    render() {

        const menuOptions = this.renderMenuOptions();

        return (<div className={styles.topMenu}>
            <div onClick={() => this.openModulesHandler()} className={styles.topMenu_button}><div>Modules</div>
            </div>
            {/* The modules block */}
            <div className={this.state.topMenu ? styles.topMenu_modules : styles.topMenu_modules_hide}>

                {/* The Menu to change de module */}
                {this.props.menu_options.map((value, index) => {
                    return <div key={value.name} onClick={() => this.selectModuleHandler(index)} className={styles.module_option}>
                        {/* <img className="module_option_icon" alt="Módulo" src={'/assets/' + value.icon}></img> */}
                        <i className={styles.module_option_icon + " " + value.icon}></i>
                        <div className={styles.module_option_name}>{value.name}</div>
                    </div>
                })}

            </div>

            {/* The links/buttons from this module */}
            {menuOptions}

            <div onClick={() => this.openUserMenuHandler()} className={styles.topMenu_user_button}><div>User</div>
            </div>

            <div className={this.state.userMenu ? styles.topMenu_user : styles.topMenu_user_hide}>

                {/* The Menu of the user options */}
                {this.props.user_menu.map((value, index) => {
                    
                    // If was passed a action
                    if (value.action) {
                        return <div key={value.name} onClick={() => value.action()} className={styles.user_option}>
                            <div className={styles.user_option_name}>{value.name}</div>
                        </div>
                    }else{
                        return <div key={value.name} onClick={() => this.openWindowHandler(value)} className={styles.user_option}>
                            <div className={styles.user_option_name}>{value.name}</div>
                        </div>
                    }
                })}

            </div>

         

            {/* <div onClick={this.openWindowHandler.bind(this, this.props.menu_options[0])}>{this.props.menu_options[0].name}</div>
            <div onClick={this.openWindowHandler.bind(this, this.props.menu_options[1])}>{this.props.menu_options[1].name}</div> */}
        </div>
        );

    }

}

// Defining the types required by the object TopMenu
TopMenu.propTypes = {
    menu_options: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        items: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,

            component: PropTypes.object
        }))
    }))
}




export default TopMenu;