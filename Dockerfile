FROM debian:wheezy
MAINTAINER Andrey Mikhalchuk <amikhalchuk@akira-tech.com>

# install the required software
RUN /bin/bash -c "apt-get update && apt-get install -y curl git procps"
RUN /bin/bash -c "curl https://install.meteor.com | /bin/sh"

# clone repo
ENV APP_DIR "/root/app"
RUN /bin/bash -c "git clone https://github.com/akira-tech/RFQ993471.git ${APP_DIR}"

WORKDIR $APP_DIR

EXPOSE 3000

ENTRYPOINT meteor --production --port 3000 2>&1

# build as
# git clone https://github.com/akira-tech/RFQ993471.git akira_app
# cd akira_app
# docker build -t akiratech/rfq993471 .

# run as
# docker run -d -p 5000:3000 akiratech/rfq993471
# it takes couple minutes to start for the first time
# the app will be available at http://localhost:5000
