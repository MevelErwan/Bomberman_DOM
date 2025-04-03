/*
Package lobby_socket provides functions for broadcasting data to connected clients in the lobby.
*/
package lobby_socket

import (
	"encoding/json"

	structures "backend/data"

	"golang.org/x/net/websocket"
)

/*
RefreshPlayerCount logs the current state of the Lobby and broadcasts the updated player count to all connected clients.
*/
func RefreshPlayerCount() {
	for _, ws := range Lobby {
		toSend, _ := json.Marshal(structures.Data{Request: "refreshPlayerCountQueue", Value: "", PlayerCount: PlayerCount})
		ws.Write(toSend)
	}
}

/*
BroadcastPlayerListForLobby constructs a list of player names from the Lobby and broadcasts it to all connected clients.

Parameters:
- Lobby: A map containing the connected clients and their names.
*/
func BroadcastPlayerListForLobby(Lobby map[string]*websocket.Conn) {
	namesUsers := make([]string, 0)

	for name := range Lobby {
		namesUsers = append(namesUsers, name)
	}

	toSend, _ := json.Marshal(structures.PlayerList{
		Request: "refreshNameListLobby",
		Value:   namesUsers,
	})

	for _, ws := range Lobby {
		ws.Write(toSend)
	}
}

/*
BroadcastChatForLobby sends a chat message to all clients in the lobby.

Parameters:
- author: The name of the user sending the message.
- text: The content of the chat message.
*/
func BroadcastChatForLobby(author, text string) {
	for _, ws := range Lobby {
		toSend, _ := json.Marshal(structures.Chat{Request: "newChat", Author: author, Text: text})
		ws.Write(toSend)
	}
}
