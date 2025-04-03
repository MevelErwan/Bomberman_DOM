/*
Package lobby_socket defines global variables used across the lobby socket functionalities.
*/
package lobby_socket

import (
	"golang.org/x/net/websocket"
)

/*
Lobby is a map that represents the current state of the lobby.
Each key is a player's name and the associated value is their websocket connection.
*/
var Lobby = make(map[string]*websocket.Conn)

/*
PlayerCount represents the current number of players in the lobby.
It is initialized with the length of the Lobby map.
*/
var PlayerCount = len(Lobby)

/*
Chrono is a boolean flag used to determine if the game's timer mechanism is active or not.
It is initialized to true, indicating that the timer is active by default.
*/
var Chrono = true