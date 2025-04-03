/*
Package lobby_socket provides utility functions to assist with data processing in the lobby.
*/
package lobby_socket

import (
	structures "backend/data"
	"encoding/json"

	"golang.org/x/net/websocket"
)

/*
GetData decodes the provided byte slice into a Data structure.

Parameters:
- data: The byte slice containing the JSON representation of the Data structure.

Returns:
- A Data structure containing the decoded data.
- The original byte slice.

This function is used to convert incoming byte data into a more usable Go structure.
*/
func GetData(data []byte) (structures.Data, []byte) {
    var trueData structures.Data
    json.Unmarshal(data, &trueData)
    return trueData, data
}

func PlayerDontExist(lobby map[string]*websocket.Conn, username string) bool {
    _, ok := lobby[username];
    return ok
}
