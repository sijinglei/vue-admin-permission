#!/bin/bash

read -p "提交注释信息:"  val
echo $val
git add --all
git commit -m $val
git remote add origin https://github.com/sijinglei/vue-admin-permission.git
git push -u origin master