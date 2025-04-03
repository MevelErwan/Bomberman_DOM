/*
Package socket provides the main entry point for handling WebSocket connections.
*/
package socket

import (
	lobby "backend/socket/lobby-socket"
	game "backend/socket/game-socket"
	"golang.org/x/net/websocket"
)

/*
HandleAllWebsocket processes the incoming data from a WebSocket connection.

Parameters:
- data: The byte slice containing the incoming data.
- ws: The WebSocket connection from which the data was received.

This function serves as a bridge to delegate the handling of the WebSocket data to the lobby package.
*/
func HandleAllWebsocket(data []byte, ws *websocket.Conn) {
	lobby.CheckData(data, ws)
	game.HandleWSGame(data, ws)
}
