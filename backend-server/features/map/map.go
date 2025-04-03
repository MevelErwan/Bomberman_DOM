package brick_map

import (
	"encoding/json"
	"io/ioutil"
	"math/rand"
	"os"
	"strconv"
	"strings"
	"time"
)

type Map_data struct {
	Map  []string   `json:"map"`
	Type [][]string `json:"type"`
}

func Random_brick(map_id string) []string {
	jsonFile, _ := os.Open("../frontend-server/static/assets/map/" + map_id + "/map.json")
	jsonRead, _ := ioutil.ReadAll(jsonFile)
	var jsonMap Map_data
	json.Unmarshal(jsonRead, &jsonMap)
	map_of_brick := new_brick_map(jsonMap)
	return map_of_brick
}

func new_brick_map(jsonMap Map_data) []string {
	var res []string
	for _, a := range jsonMap.Map {
		app := ""
		for _, b := range strings.Split(a, " ") {
			if check(b, jsonMap.Type) {
				if prok() {
					power := power_or_not()
					if power > 2 {
						app += "b "
					} else {
						app += strconv.Itoa(power) + " "
					}
				} else {
					app += "r "
				}
			} else {
				app += "r "
			}
		}
		res = append(res, strings.TrimSuffix(app, " "))
	}
	return res
}

func check(to_check string, typ [][]string) bool {
	for _, a := range typ {
		if (a[0] == to_check || a[0] == "rest") && a[1] == "floor" {
			return true
		} else if (a[0] == to_check || a[0] == "rest") && a[1] != "floor" {
			return false
		}
	}
	return false
}

func prok() bool {
	rand.Seed(time.Now().UnixNano())
	rand := rand.Intn(3)
	if rand < 2 {
		return true
	} else {
		return false
	}
}

func power_or_not() int {
	rand.Seed(time.Now().UnixNano())
	rand := rand.Intn(15)
	if rand <= 2 {
		return rand
	} else {
		return 7
	}
}
