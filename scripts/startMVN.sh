#!/bin/bash

java -jar target/gps-app-0.0.1-SNAPSHOT.war --spring.profiles.active=prod </dev/null &>/dev/null &
