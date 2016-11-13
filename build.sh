#!bin/sh


tar cvfz - dist | ssh root@172.22.1.158  "cd /usr/local/nginx; rm -rf dist.tar.gz; tar xvfz -"


exit
