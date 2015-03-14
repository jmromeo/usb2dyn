#!/bin/sh
USR=$(who am i | awk '{print $1}')
adduser $USR dialout
