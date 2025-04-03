package chrono

import (
	"encoding/json"
	"fmt"
	"time"

	dataStruct "backend/data"
	game "backend/socket/game-socket"

	"golang.org/x/net/websocket"
)

func BroadcastToAll(toSend []byte, lobby map[string]*websocket.Conn) {
	for _, ws := range lobby {
		ws.Write(toSend)
	}
}

func ChronoMecanism(lobby map[string]*websocket.Conn) bool {
	duration := 10 * time.Second
	ticker := time.NewTicker(1 * time.Second)

	for {

		if len(lobby) == 0 {
			return true
		}

		select {
		case <-ticker.C:
			// Si plus de 2 joueurs et que le chrono atteint 20 secondes
			if len(lobby) > 2 && duration > 10*time.Second {
				duration = 10 * time.Second
			} else {
				duration -= 1 * time.Second
			}

			if duration <= 0 {
				ticker.Stop()

				toSend, _ := json.Marshal(dataStruct.Data{
					Request: "chrono",
					Value:   "00:00",
				})
				BroadcastToAll(toSend, lobby)
				
				game.SetUpGame(lobby)

				game.GameInProgress = true
				
				return true
			}

			totalSeconds := int(duration.Seconds())
			minutes := totalSeconds / 60
			seconds := totalSeconds % 60

			formattedTime := fmt.Sprintf("%02d:%02d", minutes, seconds)

			toSend, _ := json.Marshal(dataStruct.Data{
				Request: "chrono",
				Value:   formattedTime,
			})
			BroadcastToAll(toSend, lobby)
		}
	}	
}
