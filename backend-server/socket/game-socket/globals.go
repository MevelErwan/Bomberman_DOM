package game

import (
	dataStruct "backend/data"
)

var MapID int

var (
	MinIDMap = 1
	MaxIDMap = 4
)

var GameInProgress = false

var LobbyPlayers = make(map[string]*dataStruct.Player)