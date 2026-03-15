/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useUserStore } from '../../store/userStore';
import { useRiderStore } from '../../store/riderStore';

export const SocketContext = createContext();

const socket = io(
  import.meta.env.VITE_SOCKET_URL ||
  'http://localhost:3000'
);

const SocketProvider = ({ children }) => {

    const user = useUserStore((state) => state.user);
    const rider = useRiderStore((state) => state.rider);

    useEffect(() => {

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });

        // return () => {
        //     socket.off('connect');
        //     socket.off('disconnect');
        // };

    }, []);

    useEffect(() => {

        if (user?._id) {
            socket.emit('join', {
                userType: 'user',
                userId: user._id
            });
        }

        if (rider?._id) {
            socket.emit('join', {
                userType: 'rider',
                userId: rider._id
            });
        }

    }, [user?._id, rider?._id]);

    const sendMessage = (eventName, data) => {
        socket.emit(eventName, data);
    };

    const receiveMessage = (eventName, callback) => {
        socket.on(eventName, callback);

        return () => {
            socket.off(eventName, callback);
        };
    };

    return (
        <SocketContext.Provider value={{ socket, sendMessage, receiveMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
