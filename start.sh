#!/bin/sh

if [ "$SET_CONTAINER_TIMEZONE" = "true" ]; then
    echo ${CONTAINER_TIMEZONE} >/etc/timezone && \
    ln -sf /usr/share/zoneinfo/${CONTAINER_TIMEZONE} /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata
    echo "Timezone: $CONTAINER_TIMEZONE"
else
    echo "Timezone não modificado"
fi

# echo "Installing dependencies..."
# npm install
export NODE_ENV=docker
echo "Start server ..."
npm run dev

# echo "Create Tag image..."
# docker build -t api-node:v1 .

# echo "Apply kubernetes ..."
# kubectl apply -f ./kube
