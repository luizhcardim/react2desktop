# react2desktop

> Desktop-like environment for ReactJS

[![NPM](https://img.shields.io/npm/v/react2desktop.svg)](https://www.npmjs.com/package/react2desktop) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)


![](d2r.gif)

## Install

```bash
npm install --save react2desktop
```

## Usage

```jsx
import React from 'react'

import Desktop from 'react2desktop'
import 'react2desktop/dist/index.css'

// Here you import the elements you will put inside the windows
import { BlankPage } from './blank' 

const App = () => {

  // Passing the menu options
  let menu = [
    {

      name: 'Module Name 1', // Name of the first module
      icon: 'ri-focus-line',  // Icon of the first module
      items: [
        {
          name: 'Menu 1', items: [ // Name of the first menu of the first module
            { name: 'Option 1', icon: 'center.png', component: <BlankPage></BlankPage> }, // The options from the menu...
            { name: 'Option 2', icon: 'ri-building-line', component: <BlankPage></BlankPage> },
          ]
        },
        {
          name: 'Menu 2', items: [ // Name of the first menu of the first module
            { name: 'Option 1', icon: 'center.png', component: <BlankPage></BlankPage> }, // The options from the menu...
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
            { name: 'Option 1', icon: 'center.png', component: <BlankPage></BlankPage> },
            { name: 'Option 2', icon: 'center.png', component: <BlankPage></BlankPage> }
          ]
        },
        { name: 'Direct Option', icon: 'center.png', component: <BlankPage></BlankPage> }
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
```


## The inherited props 

React2Desktop makes the window functions accessible to child components through props. (Look at the examples > pages > example.jsx)

### onWindowSelect

### onChildOpen


### onWindowSelected


### onWindowClose

### onWindowMinimize


### onStartLoading

### onStopLoading



## License

MIT © [luizhcardim](https://github.com/luizhcardim)
