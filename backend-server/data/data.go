package dataStruct

import "golang.org/x/net/websocket"

type Data struct {
	Request     string `json:"request"`
	Value       string `json:"value"`
	PlayerCount int    `json:"playercount"`
}

type PlayerList struct {
	Request string   `json:"request"`
	Value   []string `json:"value"`
}

type Chat struct {
	Request string `json:"request"`
	Author  string `json:"author"`
	Text    string `json:"text"`
}

type Life struct {
	Request string   `json:"request"`
	Life    []string `json:"life"`
}

type ChronoData struct {
	Request string `json:"request"`
	Minutes string `json:"minutes"`
	Seconds string `json:"seconds"`
}

type GameSetup struct {
	Request string   `json:"request"`
	MapID   string   `json:"mapid"`
	Blocks  []string `json:"blocks"`
}

type PowerUps struct {
	Bombs int     `json:"bombs"`
	Flame int     `json:"flame"`
	Speed float64 `json:"speed"`
}

type BCPowerUp struct {
	Request  string  `json:"request"`
	Position [][]int `json:"position"`
	Type     string  `json:"type"`
}
type Player struct {
	Name        string          `json:"name"`
	Socket      *websocket.Conn `json:"socket"`
	StartX      float64         `json:"startx"`
	StartY      float64         `json:"starty"`
	X           float64         `json:"x"`
	Y           float64         `json:"y"`
	CurrentMove *Direction      `json:"currentmove"`
	PlayerId    int             `json:"playerid"`
	Color       string          `json:"color"`
	PowerUps    *PowerUps       `json:"powerup"`
}

type Direction struct {
	Up    bool `json:"up"`
	Down  bool `json:"down"`
	Left  bool `json:"left"`
	Right bool `json:"right"`
}

type RenderPlayer struct {
	Request string `json:"request"`
	Player  Player `json:"player"`
}

type MovePlayer struct {
	Request string `json:"request"`
	Name    string `json:"name"`
	Value   string `json:"value"`
}

type Power_up_taked struct {
	Request string `json:"request"`
	Name    string `json:"name"`
	Value   int    `json:"value"`
	Pos     int    `json:"pos"`
}

type AllPlayer struct {
	Request string             `json:"request"`
	Players map[string]*Player `json:"players"`
}

type UpdateXYPlayer struct {
	Request string `json:"request"`
	Name    string `json:"name"`
	Dir     string `json:"dir"`
}

type Bomb struct {
	Request string `json:"request"`
	Name    string `json:"name"`
	Value   int    `json:"value"`
}

type BombExplode struct {
	Request string `json:"request"`
	Name    string `json:"name"`
	Value   int    `json:"value"`
	Range   int    `json:"range"`
}

type ExplosionCol struct {
	Request  string `json:"request"`
	Username string `json:"username"`
}
