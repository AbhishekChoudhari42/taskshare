import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux_toolkit/store'
import { Provider } from 'react-redux'
import SocketContextProvider from './context/SocketContextProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <SocketContextProvider>
            <App />
        </SocketContextProvider>
    </Provider>
)
