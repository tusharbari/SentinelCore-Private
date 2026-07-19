import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

let stompClient = null;

export const connectWebSocket = (onMessage) => {

    stompClient = new Client({

        webSocketFactory: () => new SockJS("http://localhost:8080/ws"),

        reconnectDelay: 5000,

        onConnect: () => {

            console.log("✅ Connected to Alert WebSocket");

            stompClient.subscribe("/topic/alerts", (message) => {

                const alert = JSON.parse(message.body);

                onMessage(alert);

            });

        },

        onStompError: (frame) => {

            console.error("STOMP Error:", frame);

        }

    });

    stompClient.activate();
};

export const disconnectWebSocket = () => {

    if (stompClient) {
        stompClient.deactivate();
    }

};