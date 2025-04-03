/*
Package lobby_socket provides functions to manage the state of the lobby.
*/
package lobby_socket

import (
	"golang.org/x/net/websocket"
	game "backend/socket/game-socket"
)

/*
CheckIfIsInALobby checks if a given websocket connection is part of the lobby.

Parameters:
- disconnected: The websocket connection to check.

If the connection is found in the lobby, it is removed. The player count is then updated and broadcasted to all remaining players.
If the lobby becomes empty, the game timer mechanism is reactivated.
*/
func CheckIfIsInALobby(disconnected *websocket.Conn) {
	// Iterate through the lobby to find the disconnected player.
	for i, ws := range Lobby {
		if ws == disconnected {
			// Remove the player from the lobby.
			delete(Lobby, i)
			delete(game.LobbyPlayers, i)
			
			// Update the player count.
			PlayerCount = len(Lobby)
			
			// Broadcast the updated player count to all remaining players.
			RefreshPlayerCount()
			break
		}
	}

	// Reactivate the game timer mechanism if the lobby is empty.
	if len(Lobby) < 1 {
		Chrono = true
	}

	// Broadcast the updated player list to all remaining players.
	BroadcastPlayerListForLobby(Lobby)
}
