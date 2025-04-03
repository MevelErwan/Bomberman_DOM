/*
Package lobby_socket provides handlers for processing data received over the websocket.
*/
package lobby_socket

import (
	"encoding/json"

	structures "backend/data"
	game "backend/socket/game-socket"
	chrono "backend/features/chrono"

	"golang.org/x/net/websocket"
)

/*
CheckData processes the received data, determines its type, and handles it accordingly.

Parameters:
- data: The raw byte slice received over the websocket.
- ws: The websocket connection from which the data was received.

The function first decodes the data into a known structure. Depending on the request type, it then performs various actions.
*/
func CheckData(data []byte, ws *websocket.Conn) {
	// Decode the received data into a known structure.
	trueData, data := GetData(data)

	// Handle data based on the request type.
	if trueData.Request == "username" {
		// Check if the lobby has space for more players.
		if PlayerCount < 4 && !PlayerDontExist(Lobby, trueData.Value) && trueData.Value != "" && !game.GameInProgress {
			// Add the player to the lobby.
			Lobby[trueData.Value] = ws

			
			// Prepare a message to send back to the client.
			toSend, _ := json.Marshal(structures.Data{
				Request:     "GoToQueue",
				Value:       trueData.Value,
				PlayerCount: PlayerCount,
			})

			// Send the message back to the client.
			ws.Write(toSend)

			// Broadcast the updated player list to all clients in the lobby.
			BroadcastPlayerListForLobby(Lobby)

			// Check if the game timer mechanism is active.
			if Chrono && len(Lobby) > 1 {
				// Deactivate the timer and start the game timer mechanism.
				Chrono = false
				go chrono.ChronoMecanism(Lobby)
			}

			// Update the player count and broadcast it to all clients.
			if PlayerCount < len(Lobby) {
				PlayerCount++
				for _, ws := range Lobby {
					toSend, _ := json.Marshal(structures.Data{Request: "refreshPlayerCountQueue", Value: "", PlayerCount: PlayerCount})
					ws.Write(toSend)
				}
			}

		} else {
			if trueData.Value == "" {
				toSend, _ := json.Marshal(structures.Data{
					Request: "Username empty",
					Value: trueData.Value,
				})

				ws.Write(toSend)
			} else if game.GameInProgress {
				toSend, _ := json.Marshal(structures.Data{
					Request: "Game in working",
					Value: trueData.Value,
				})

				ws.Write(toSend)
			} else if len(Lobby) < 4 {
				toSend, _ := json.Marshal(structures.Data{
					Request: "Username already used",
					Value: trueData.Value,
				})

				ws.Write(toSend)
			} else {
				// If the lobby is full, inform the client that they can't join.
				toSend, _ := json.Marshal(structures.Data{
					Request:     "Can't join Queue",
					Value:       trueData.Value,
					PlayerCount: PlayerCount,
				})
	
				ws.Write(toSend)
			}
		}
	} else if trueData.Request == "chatWithHommies" {
		// Handle chat messages.
		var chat structures.Chat
		json.Unmarshal(data, &chat)

		// Broadcast the chat message to all clients in the lobby.
		BroadcastChatForLobby(chat.Author+":", chat.Text)
	}
}
