import { createContext, useContext, useReducer } from "react";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'VOTE':
            return `A vote for "${action.payload}"`
        case 'ADD':
            return `A new anecdote "${action.payload}" is added`
        case 'ERR':
            return action.payload
        case 'NULL':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, nDispatch] = useReducer(notificationReducer, null)
    return (
        <NotificationContext.Provider value={[notification, nDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationValue = () => {
    const noteAndDispatch = useContext(NotificationContext)
    return noteAndDispatch[0]
}

export const useNoteDispatch = () => {
    const noteAndDispatch = useContext(NotificationContext)
    return noteAndDispatch[1]
}

export default NotificationContext