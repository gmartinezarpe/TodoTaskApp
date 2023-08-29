import React from 'react'
import { Provider } from 'react-redux'
import { MainPage } from './mainPage'
import { store } from './store/store'


export const TaskApp = () => {
  return (
    <>
    <div>
        <Provider store={store}> 
        <MainPage/>
      </Provider>
    </div>
    </>
  )
}

