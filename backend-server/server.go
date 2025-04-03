/*
Package main provides the server functionalities for handling WebSocket connections.

It defines the Server structure, its methods, and the associated helper functions.
The server is responsible for reading incoming data from clients, processing it, and broadcasting it to other clients.
*/
package main

import (
	socket "backend/socket"
	lobby "backend/socket/lobby-socket"
	game "backend/socket/game-socket"
	"fmt"
	"io"

	"golang.org/x/net/websocket"
)

/*
Server structure represents the WebSocket server.
It maintains a map of active WebSocket connections.
*/
type Server struct {
	conns map[*websocket.Conn]bool
}

/*
NewServer initializes and returns a new instance of the Server structure.
It sets up an empty map to track active WebSocket connections.
*/
func NewServer() *Server {
	return &Server{
		conns: make(map[*websocket.Conn]bool),
	}
}

/*
HandleWS is a method of the Server structure.
It handles new incoming WebSocket connections, logs the client's address, and starts the read loop for the connection.
*/
func (s *Server) HandleWS(ws *websocket.Conn) {
	fmt.Println("new incoming connection from client", ws.RemoteAddr())
	s.conns[ws] = true
	s.readLoop(ws)
}

/*
readLoop is a method of the Server structure.
It continuously reads data from a WebSocket connection until an error occurs or the connection is closed.

1. If an EOF error is encountered, it checks if the client is in a lobby and then breaks out of the loop.
2. If any other error is encountered, it logs the error and continues to the next iteration.
3. If data is successfully read, it is processed and then echoed back to the client.
*/
func (s *Server) readLoop(ws *websocket.Conn) {
	buf := make([]byte, 1024)

	for {
		n, err := ws.Read(buf)
		if err != nil {
			if err == io.EOF {
				lobby.CheckIfIsInALobby(ws)
				break
			}
			fmt.Println("error read : ", err)
			continue
		}

		if len(lobby.Lobby) < 1 {
			game.MapID = game.RandomBetween(game.MinIDMap, game.MaxIDMap)
			game.GameInProgress = false
		}

		data := buf[:n]
		socket.HandleAllWebsocket(data, ws)
		//fmt.Println(lobby.Lobby)
		ws.Write(data)
	}
}