# RFQ993471 - Agile BPA PoC

## Summary

  This project demonstrates Akira Technologies capabilities in developing web application using cutting-edge technologies and Agile methodology

## Evaluation Criteria

### A. Team Leader

  Akira selected on of its project managers to be the team leader and coordingate the team effort and deliverables using Jira Kanban and Google Docs as the primary tools.

### B. Team

  Akira's team conists of 8 people working simultaneously in multiple projects and joining different efforts on demand.

### Understanding people needs
  Akira identified the following categories of users and their needs:
  * __Researchers__ - looking for data visualization, ways to export both data and imagery
  * __Developers__ - looking for data export functionality using one of public standard protocols such as REST
  * __General public__ - looking for something interactive, entertaining and in general interesting
  Akira included representatives from all 3 groups of people to brainstorm about the idea for the project.
  Discussions with these groups of people lead to the current product functionality and UI design

### Human-centered design techniques
  Akira selected the following techniques for this project:
  * __Focus group__. Please see the [meetings minutes](/doc/meeting-minutes) in the [documentation folder](/doc).
  * __Usability testing__. The [test plan](/doc/usability_test/2015062901/plan.txt) and [outcomes](/doc/usability_test) are provided in the documentation folder
  * __Participatory design__. The engaged groups of users were submitting their feedback in the form of Jira issues as well as informal emails that ware further converted into Jira issues.

### Design Style Guide
  [All stages of the UI design process](/doc/design) are included into the github repository
  The design style guide is provided as a combination of the [design image](/doc/images/3_design_1.png) and [style guilde document](/doc/design/4_design_style_guide.txt).

### Usability Tests
  Akira conducted two usability minitests and posted [the results](/doc/usability_test) to the github

### Prototype
  Our prototype is available in the form of
  * __Web application__: available at http://agilebpa.akira-tech.com
  * __iOS__ application: [see the screenshot #1](/doc/responsive_and_multiplatform/ios_1.png) or [screenshor #2](/doc/responsive_and_multiplatform/ios_2.png) of the app running in the emulator
  * __Android__ application: [see the screenshot](/doc/responsive_and_multiplatform/android.png) of the app running in the emulator
  It also has fully responsive design as illustrated on [scheenshot #1](/doc/responsive_and_multiplatform/chrome_narrow_1.png) and [screenshot #2)(/doc/responsive_and_multiplatform/chrome_wide_2.png)

### C. Technologies
  In this prototype we used the following technologies:
  * HTML5
  * CSS3/Less
  * Responsive design with Bootstrap
  * jQuery
  * Websockets.io - main browser-server communication protocol
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
  We initially used combination of meteor+velocity_jasmine for different types of tests, but unfortunately this combination doesn't work well in headless environments, so we switched to pure jasmine.
  [The basic set of unit tests](/tests) is the part of the github repository.
  In order to run the tests please make sure you have underscore and fs installed (which [require npm and node.js](https://nodejs.org/download/)):

  ```sh
  npm install -g underscore fs
  ```

  You can runt he tests with the following command in the cloned repository:

  ```sh
  cd tests; jasmine
  ```

### F. Continuous integration system
  We use Jenkins as the continuous integration system. The server is publicly available as [http://agilebpa.akira-tech.com:8080/](http://agilebpa.akira-tech.com:8080/)
  [The CI system screenshots](.doc.continuous_integration) are also available in github.
  Upon successful build Jenkins runs Ansible to create docker image, push it to Docker HUB and then deploy to the two application servers.

### G. Configuration management
  For the configuration management and container orchestration we use Ansible+Docker.

### H. Continuous monitoring
 The following solutions are implemented for the continuous monitoring:
 * __AWS CloudWatch__ - for systems parameters monitoring (CPU Load, disk space etc)
 * __AWS ELB__ in combination with CloudWatch for the website(s) uptime monitoring
 * __AWS SNS__ for event notifications
 * __AWS CloudTrail__ for security and system changes monitoring
 * __CloudCheckr__ aggregates information from all these systems to complete the continuous monitoring
 [These screenshots provide a good idea of what kind of monitoring information we're getting from this powerful combination](/doc/continuous_monitoring).

### I. Containerization
  We use Docker as the tool for building images and running them in containers.
  You can run the application on a system with installed Docker using the following command:

  ```sh
  docker run -d -p 5000:3000 akiratech/rfq993471
  ```

  In 2-3 minutes the application will become available at http://localhost:5000

### J. Iterative approach
  For this project Akira used Kanban process. From our experience this process fits quick development tasks that last less than 2 weeks much better than Scrum.
  In our bigger project we prefer to use Scrum with two-week iterations though.
  We used our standard tools for the project coordination: Jira Kanaban and Google docs (for editing documents in realtime)
  Our process involved continuous integration and deployment and we were typically deploying the code multiple times a day during the periods of active development.
  Based on the feedback from the usability testers and stakeholders we kept adding new stories to Jira. The project manager worked with the developers to prioritize the tasks.

### K. Installation / Running the app
There are multiple ways to install and run the application, all [explained in the Github Wiki](/wiki/Installing-and-Running-the-Application)

### L. Licenses

We only used open source and free of chage software in this project.
Please find the complete list of technologies and and corresponding licenses on the Github Wiki](/wiki/Software-Licenses)

### Other Notes

#### 508 Compliance

Just like with other Akira solutions we made sure this app is 508 compliant, fixed all related problems (including the contrast errors) and made the wordcloud content available to screenreaders.
You have review the compliance with <a href="https://wave.webaim.org/toolbar/">Webaim WAVE Toolbar</a> (please do not use the online version).
You can also find the [WAVE scan screenshot](/doc/508/508.png) in the Github repository.

#### REST API
  Our application both consumes and exposes data via REST interface:
  * [consuming open.fda.gov data](https://api.fda.gov/drug/label.json?api_key=AKIRA_API_KEY&search=effective_time:[20130601+TO+20140731]+AND+_exists_:warnings&limit=100)
  * [exposing http://agilebpa.akira-tech.com/words-frequency.json](http://agilebpa.akira-tech.com/words-frequency.json)
