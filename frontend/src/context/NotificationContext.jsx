import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    connectWebSocket,
    disconnectWebSocket
} from "../services/websocket";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        connectWebSocket((alert) => {

            const notification = {
                ...alert,
                id: Date.now(),
                read: false,
                receivedAt: new Date()
            };

            setNotifications(prev => [
                notification,
                ...prev
            ]);

            toast.success(
                `🚨 ${alert.title}\nSeverity: ${alert.severity}`
            );

        });

        return () => disconnectWebSocket();

    }, []);

    const unreadCount =
        notifications.filter(n => !n.read).length;

    const markAllRead = () => {

        setNotifications(prev =>
            prev.map(n => ({
                ...n,
                read: true
            }))
        );

    };

    const clearNotifications = () => {

        setNotifications([]);

    };

    return (

        <NotificationContext.Provider
            value={{
                notifications,
                unreadCount,
                markAllRead,
                clearNotifications
            }}
        >
            {children}
        </NotificationContext.Provider>

    );

};

export const useNotifications = () =>
    useContext(NotificationContext);