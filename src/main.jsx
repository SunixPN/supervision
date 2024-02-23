import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./assets/index.scss"
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchInterval: false,
            refetchOnReconnect: false,
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <App />
        </Provider>
    </QueryClientProvider>
    </React.StrictMode>
)
