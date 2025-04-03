/*
Package main is the entry point for the backend server application.
It sets up the WebSocket server and listens for incoming connections.
*/
package main

import (
	"log"
	"net/http"
	"golang.org/x/net/websocket"
)

/*
The main function initializes the WebSocket server and starts listening for incoming connections.

1. It retrieves the outbound IP address of the server.
2. It sets up the WebSocket endpoint at "/ws".
3. It logs the server's address and port.
4. It starts the HTTP server and listens for incoming connections.
*/
func main() {
	// Retrieve the outbound IP address
	addr := GetOutboundIP()
	port := ":1234"

	// Initialize a new WebSocket server
	server := NewServer()

	// Set up the WebSocket endpoint
	http.Handle("/ws", websocket.Handler(server.HandleWS))

	// Log the server's address and port
	log.Printf("Backend server on the adress : http://%v%v or http://localhost%v\n", addr, port, port)

	// Start the HTTP server and listen for incoming connections
	//if err := http.ListenAndServe(addr+port, nil); err != nil {
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatalf("Error during backend server start at : http://%v%v %v", addr, port, err)
	}
}
