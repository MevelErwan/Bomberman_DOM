package main

import (
	"log"
	"net"
	"net/http"
)

func GetOutboundIP() string {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	localAddr := conn.LocalAddr().(*net.UDPAddr)

	return localAddr.IP.String()
}

func SPAHandler(fs http.FileSystem) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, err := fs.Open(r.URL.Path)
		if err != nil {
			// Si le fichier n'existe pas, redirigez vers index.html
			http.ServeFile(w, r, "./static/index.html")
			return
		}
		http.FileServer(fs).ServeHTTP(w, r)
	}
}

func main() {
	addr := GetOutboundIP()
	port := ":4321"

	fs := http.Dir("./static")
	http.HandleFunc("/", SPAHandler(fs))
	//http.Handle("/queue", fs)

	log.Printf("Frontend server on the adress : http://%v%v or http://localhost%v\n", addr, port, port)
	if err := http.ListenAndServe(port, nil); err != nil {
	//if err := http.ListenAndServe(addr+port, nil); err != nil {
		log.Fatalf("Error during frontend server start at : http://%v%v %v", addr, port, err)
	}
}