import React from 'react'

import Desktop from 'react2desktop'
import { BlankPage } from './blank'
import 'react2desktop/dist/index.css'

const App = () => {

  // Passing the menu options
  let menu = [
    {

      name: 'Module 1', // Name of the first module
      icon: 'ri-focus-line',  // Icon of the first module
      items: [
        {
          name: 'First Menu Name', items: [ // Name of the first menu of the first module
            { name: 'Bairros', icon: 'center.png', component: <BlankPage></BlankPage> }, // The options from the menu...
            { name: 'Cargos', icon: 'ri-building-line', component: <BlankPage></BlankPage> },
            { name: 'Cidades', icon: 'ri-building-line', component: <BlankPage></BlankPage> },
            { name: 'Funcionários', icon: 'ri-building-line', component: <BlankPage></BlankPage> },
            { name: 'Pessoas', icon: 'ri-building-line', component: <BlankPage></BlankPage> },
            { name: 'Unidades Organizacionais', icon: 'ri-building-line', component: <BlankPage></BlankPage> },

          ]
        },
      ]
    },
    {

      name: 'Module 2', // Name of the second module
      icon: 'ri-book-open-fill',
      items: [
        {
          name: 'Cadastros', items: [
            { name: 'Cidade 3', icon: 'center.png', component: <BlankPage></BlankPage> },
            { name: 'Bairro 3', icon: 'center.png', component: <BlankPage></BlankPage> }
          ]
        },
        { name: 'Cidade 2', icon: 'center.png', component: <BlankPage></BlankPage> }
      ]
    }
  ]

  // Options from the user menu
  let user_menu = [
    {
      name: 'Meus dados',
      component: <BlankPage></BlankPage>
    },
    {
      name: 'Sair',
      action: () => console.log('SAIR')
    },

  ]

  return <Desktop menu_options={menu} user_menu={user_menu} />
}

export default App
