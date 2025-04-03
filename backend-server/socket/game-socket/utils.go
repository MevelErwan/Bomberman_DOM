package game

import (
	"encoding/json"
	"math/rand"
	"strconv"

	dataStruct "backend/data"
	structures "backend/data"
	brick_map "backend/features/map"

	"golang.org/x/net/websocket"
)

func RandomBetween(min, max int) int {
	return rand.Intn(max-min+1) + min
}

func GoodMapID(IDMap int) string {
	if IDMap < 10 {
		return "0" + strconv.Itoa(IDMap)
	} else {
		return strconv.Itoa(IDMap)
	}
}

func SetUpGame(lobby map[string]*websocket.Conn) {
	toSend, _ := json.Marshal(dataStruct.GameSetup{
		Request: "GoToGame",
		MapID:   GoodMapID(MapID),
		Blocks:  brick_map.Random_brick(GoodMapID(MapID)),
	})

	BroadcastToAll(toSend, lobby)

	startPosition := [][]float64{{7, 73}, {84, 73}, {7, 8}, {84, 8}}
	PlayerColors := []string{"#FF5733", "#33A2FF", "#33FF57", "#A633FF"}
	playerID := 0
	max := len(lobby)

	for name, ws := range lobby {
		infoCurrentPlayer := dataStruct.Player{
			Name:     name,
			Socket:   ws,
			StartX:   startPosition[playerID][0],
			StartY:   startPosition[playerID][1],
			X:        startPosition[playerID][0],
			Y:        startPosition[playerID][1],
			PlayerId: playerID + 1,
			CurrentMove: &structures.Direction{
				Up:    false,
				Down:  false,
				Left:  false,
				Right: false,
			},
			Color: PlayerColors[playerID],
			PowerUps: &dataStruct.PowerUps{
				Bombs: 1,
				Flame: 2,
				Speed: 0.1,
			},
		}

		LobbyPlayers[name] = &infoCurrentPlayer

		toSend, _ = json.Marshal(dataStruct.RenderPlayer{
			Request: "createNewPlayer",
			Player:  infoCurrentPlayer,
		})

		for _, ws := range lobby {
			ws.Write(toSend)
		}

		playerID++
		max--
	}

	toSend, _ = json.Marshal(dataStruct.Data{
		Request: "LaunchGame",
	})

	for _, ws := range lobby {
		ws.Write(toSend)
	}
}

func BroadcastToAll(toSend []byte, lobby map[string]*websocket.Conn) {
	for _, ws := range lobby {
		ws.Write(toSend)
	}
}

func GetData(data []byte) (structures.Data, []byte) {
	var trueData structures.Data
	json.Unmarshal(data, &trueData)
	return trueData, data
}
