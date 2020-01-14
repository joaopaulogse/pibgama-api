#!/bin/bash

# file to create functions to build
process_template() {
    eval "echo \"$(cat $1)\""
}
