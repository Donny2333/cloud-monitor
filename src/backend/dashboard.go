// Copyright 2017 The Kubernetes Authors.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/fiberhome/cloud-monitor/src/backend/handler"
	"github.com/fiberhome/cloud-monitor/src/backend/ini"
	"github.com/spf13/pflag"
)

func main() {
	// Set logging output to standard console out
	log.SetOutput(os.Stdout)

	iniPortal, err := ini.LoadConfiguration("portal.ini")
	if err != nil {
		//
		print(err)
	}

	iport := iniPortal.IntegerFromSection("monitor", "port", 9090)
	ip := iniPortal.StringFromSection("monitor", "ip", "0.0.0.0")

	pflag.CommandLine.AddGoFlagSet(flag.CommandLine)
	pflag.Parse()
	flag.CommandLine.Parse(make([]string, 0)) // Init for glog calls in kubernetes packages

	apiHandler, err := handler.CreateHTTPAPIHandler()
	if err != nil {
		//
	}
	// Run a HTTP server that serves static public files from './public' and handles API calls.
	// TODO(bryk): Disable directory listing.
	localHander := handler.MakeGzipHandler(handler.CreateLocaleHandler())
	http.Handle("/", localHander)
	http.Handle("/monitor_api/", apiHandler)
	// TODO(maciaszczykm): Move to /appConfig.json as it was discussed in #640.
	http.Handle("/monitor_api/appConfig.json", handler.AppHandler(handler.ConfigHandler))
	//http.Handle("/api/sockjs/", handler.CreateAttachHandler("/api/sockjs"))
	//http.Handle("/metrics", prometheus.Handler())

	// Listen for http or https
	log.Printf("ip:%s", ip)
	log.Printf("Serving insecurely on HTTP : port: %d", iport)
	addr := fmt.Sprintf("%s:%d", ip, iport)
	go func() { log.Fatal(http.ListenAndServe(addr, nil)) }()

	select {}
}
