#!/bin/bash

BUILD_NAME=build.tar.gz

build(){
    rm -rf dist

    /usr/local/bin/npm run build

    tar cfzpv $BUILD_NAME dist
}

upload(){
    IP="$2"
    USER="$1"

    scp build.tar.gz $USER@$IP:/tmp/build.tar.gz

    rm $BUILD_NAME
}

config(){
IP="$2"
USER="$1"

ssh -A $USER@$IP << SSH_END

cd /tmp
tar xfvpz build.tar.gz
sudo rm -rf /var/www/html/*
sudo mv ./dist/* /var/www/html
sudo rm  -rf build.tar.gz dist

SSH_END
}

REMOTE_IP="$1"
REMOTE_USER="$2"

[ -z "$REMOTE_IP" ] && { echo "Enter IP-Address to deploy to"; exit 1; }
[ -z "$REMOTE_USER" ] && { echo "Enter Remote-Machine's user"; exit 1; }

build

upload $REMOTE_USER $REMOTE_IP

config $REMOTE_USER $REMOTE_IP
