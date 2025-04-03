/*
Package main provides utility functions for the server.

This file specifically contains a function to retrieve the outbound IP address of the server.
*/
package main

import (
	"log"
	"net"
)

/*
GetOutboundIP retrieves the outbound IP address of the server.

It establishes a UDP connection to a public Google DNS server (8.8.8.8) on port 80.
This is used to determine the preferred outbound IP address of the server.
The function returns the IP address as a string.

Note: The actual connection is never made. The OS just uses this to determine the most appropriate network interface to use.
*/
func GetOutboundIP() string {
	conn, err := net.Dial("udp", "8.8.8.8:80")
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	localAddr := conn.LocalAddr().(*net.UDPAddr)

	return localAddr.IP.String()
}
