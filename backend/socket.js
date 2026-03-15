import { Server } from 'socket.io';
import userModel from './models/user.model.js';
import riderModel from './models/rider.model.js';

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "http://localhost:5173",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on("join", async ({ userId, userType }) => {
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { soketId: socket.id });
            } else if (userType === 'rider') {
                await riderModel.findByIdAndUpdate(userId, { soketId: socket.id });
            }
        });

        socket.on("update-location-rider", async ({ userId, location }) => {
            console.log("update-location-rider received:", userId, location);
            if (!location || !location.lat || !location.lng) return;
            try {
                console.log("Rider location updated:", userId, location);
                await riderModel.findByIdAndUpdate(userId, { 
                    location: { lat: location.lat, lng: location.lng } 
                });
            } catch (error) {
                console.log("Error updating rider location:", error);
            }
        });


        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
};

export const sendMessageToSocketId = (socketId, messageObject) => {
    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log("Socket is not initialized.");
    }
};
