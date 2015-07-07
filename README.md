# RFQ993471 - Agile BPA PoC

## Summary

This project demonstrates capabilities of Akira Technologies in developing applications using cutting-edge technologies and Agile methodology.
The application we built uses data retrieved from open.fda.gov to visualize the word frequency in warning labels grouped by Route and Product Type categories and sorted by frequency of occurrence.
The overall system architecture is presented on the following diagram:
![Akira TEchnologies Agile BPA PoC Architecture](/doc/architecture/architecture.png)

## Evaluation Criteria

### A. Team Leader

On of Akira's project managers worked as the team leader and coordingated the team effort and deliverables.

### B. Team

Akira's team conists of 6 people working simultaneously in multiple projects and joining different efforts on demand.

### C. Technologies
  In this prototype we used the following technologies:
  * HTML5
  * CSS3/Less
  * Responsive design with Bootstrap
  * jQuery
  * Websockets - main browser-server communication protocol
  * D3.js - for the wordcloud visualization
  * REST API for consuming and exposing data
  * Meteor - the main app platform
  * MongoDB - for data caching (though we typically use Memcached or Redis for this type of caching)
  * Cordova/Phonegap - for the mobile apps

### D. Deployment
  The prototype is deployed in Amazon Web Services (AWS) IaaS.
  The whole system runs on 3 EC2 instances:
  * __control server__: continous integration, docker, ansible
  * __two app servers__: running containers with the application, allocated in two different availability zones
  * __AWS ELB__: balancing load, providing redundancy and uptime monitoring
  On every code push to Github Jenkins pulls the new code using hooks and runs unit tests. Upon successful tests run it calls Docker to build image, push it to the Docker Hub and runs rolling deloy from Docker Hub to the two app servers in series using Ansible.

### E. Unit tests
  We used [Jasmine](http://jasmine.github.io/) for [unit testing](/tests). [Npm, node.js](https://nodejs.org/download/), underscore and fs are required to run the rests:

  ```sh
  npm install -g underscore fs
  cd tests; jasmine
  ```

### F. Continuous integration system
We use Jenkins as the continuous integration system: [http://agilebpa-ci.akira-tech.com:8080/](http://agilebpa-ci.akira-tech.com:8080/)
[The CI system screenshots](/doc/continuous_integration) are also available in github.
Upon successful build Jenkins runs Ansible to create docker image, push it to Docker HUB and then runs rolling deploy to the two application servers.

### G. Configuration management
For the configuration management and container orchestration we use Ansible+Docker.

### H. Continuous monitoring
 The following solutions are implemented for the continuous monitoring:
 * __AWS CloudWatch__: systems parameters monitoring (CPU Load, disk space etc)
 * __AWS ELB__: website(s) uptime monitoring (in combination with CloudWatch)
 * __AWS SNS__:event notifications
 * __AWS CloudTrail__: security and system changes monitoring
 * __CloudCheckr__: monitoring information aggregator
 [These screenshots provide a good idea of what kind of monitoring information we're getting from this powerful combination](/doc/continuous_monitoring).

### I. Containerization
We used [Docker](http://docker.com) for containerization.
You can run the application with the following command (requires Docker installation):

```sh
docker run -d -p 5000:3000 akiratech/rfq993471
```

In 2-3 minutes the application will become available at http://localhost:5000

### J. Iterative approach
Because of the duration of this project being shorter than a typical Scrum sprint, we decided to use Kanban instead of Scrum.
Jira, WebEx and Google docs were used as the main collaboration and management tools.

### K. Installation / Running the app
There are multiple ways to install and run the application, all [explained in the Github Wiki](/wiki/Installing-and-Running-the-Application)

### L. Licenses

We only used open source and free of chage software in this project.
Please find the complete list of technologies and corresponding [licenses on the Github Wiki](/wiki/Software-Licenses)

### Other Notes

#### 508 Compliance

We made sure this app is 508 compliant, fixed all related problems (including the contrast errors) and made the wordcloud content available to screenreaders.
You have review the compliance with <a href="https://wave.webaim.org/toolbar/">Webaim WAVE Toolbar</a> (please do not use the online version), [screenshot is provided](/doc/508/508.png).

#### REST API
  Our application both consumes and exposes data via REST interface:
  * [consuming open.fda.gov data](https://api.fda.gov/drug/label.json?api_key=AKIRA_API_KEY&search=effective_time:[20130601+TO+20140731]+AND+_exists_:warnings&limit=100)
  * [exposing http://agilebpa.akira-tech.com/words-frequency.json](http://agilebpa.akira-tech.com/words-frequency.json)
