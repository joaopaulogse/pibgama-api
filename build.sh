#!/bin/bash

# file to create functions to build
process_template() {
    eval "echo \"$(cat $1)\""
}
cat app.yaml.template | JWT_PRIVATE_KEY='${{ secrets.JWT_PRIVATE_KEY }}' JWT_PUBLIC_KEY='${{ secrets.JWT_PUBLIC_KEY }}' NODE_ENV='${{secrets.NODE_ENV}}' DB_URL='${{secrets.DB_URL}}' process_template > app.yaml
