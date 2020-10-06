import React from 'react'

import Desktop from 'react2desktop'
import 'react2desktop/dist/index.css'

import { BlankPage } from './blank'
import Page1 from './pages/page1'

const App = () => {

  // Passing the menu options
  let menu = [
    {

      name: 'Module Name 1', // Name of the first module
      icon: 'ri-home-line',  // Icon of the first module
      items: [
        {
          name: 'Menu 1', items: [ // Name of the first menu of the first module
            { name: 'Option 1', icon: 'ri-window-fill', component: <Page1></Page1> }, // The options from the menu...
            { name: 'Option 2', icon: 'ri-building-line', component: <BlankPage></BlankPage> },
          ]
        },
        {
          name: 'Menu 2', items: [ // Name of the first menu of the first module
            { name: 'Option 1', icon: 'ri-window-fill', component: <BlankPage></BlankPage> }, // The options from the menu...
            { name: 'Option 2', icon: 'ri-building-line', component: <BlankPage></BlankPage> },
            { name: 'Option 3', icon: 'ri-building-line', component: <BlankPage></BlankPage> },
          ]
        },
      ]
    },
    {

      name: 'Module Name 2', // Name of the second module
      icon: 'ri-book-open-fill', // Icon of the second module
      items: [
        {
          name: 'Menu 1', items: [
            { name: 'Option 1', icon: 'ri-window-fill', component: <BlankPage></BlankPage> },
            { name: 'Option 2', icon: 'ri-window-fill', component: <BlankPage></BlankPage> }
          ]
        },
        { name: 'Direct Option', icon: 'ri-window-fill', component: <BlankPage></BlankPage> }
      ]
    }
  ]

  // Options from the user menu
  let user_menu = [
    {
      name: 'My Profile',
      component: <BlankPage></BlankPage>
    },
    {
      name: 'Logout',
      action: () => console.log('Logout...')
    },

  ]

  

  return <Desktop menu_options={menu} user_menu={user_menu} />
}

export default App
