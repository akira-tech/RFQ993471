# Agile BPA PoC for Pool 2 (RFQ993471)

## Prototype

The prototype is available at [http://agilebpa.akira-tech.com](http://agilebpa.akira-tech.com)

## [Inception](https://github.com/akira-tech/RFQ993471/tree/master/doc/design)

We started working on this project with forming the team

Category # | LCAT                     | Name
-----------|--------------------------|----------------------------
Category 2 | Technical Architect:     | A. Mikhalchuk
Category 6 | Front End Web Developer: | A. Velichko
Category 7 | Backend Web Developer:   | A. Mikhalchuk / H. Schmidt
Category 8 | DevOps Engineer:         | R. Lancia / A. Ertel
           | Project Coordinator      | B. Dorsey
           | Testing, reviews, misc   | E. Liang, R. Siebel, J. Coblentz, J. Phipps

The project workforce participated in a brainstorm (Webex with followup emails) to generate the application idea.
We wanted the idea to be relatively simple, dynamic, user-friendly and implementable with the cutting-edge technological stacks.
We decided to implement an app retrieving data from http://open.fda.gov to visualize the word frequency in warning labels grouped by Route and Product Type categories and sorted by frequency of occurrence.
This application allows users at a glace understand the prevailing subjects of concern among different types of drugs.

We envisioned the following use cases:

* __General User__:
  - quickly find prevalent issues or warnings listed in the warning section of the product labels
  - share one's findings with friends using downloadable .png or .svg file

* __Researcher__:
  - compare characteristics of different types of drugs
  - download the term list (as a JSON file)
  - download the word cloud as an image (either .svg or .png) to include into a report

* __Developer__:
  - consume the data displayed in the wordcloud via REST API for inclusion in one's software product.

[![Design Sketch](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/1_sketch_tn.jpg)](https://github.com/akira-tech/RFQ993471/blob/master/doc/design/1_sketch.jpg)
[![Design Wirframe](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/2_wireframe_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/design/2_wireframe.png)
[![Final Design](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/3_design_2_tn.jpg)](https://github.com/akira-tech/RFQ993471/blob/master/doc/design/3_design_2.jpg)
[![System Architecture Draft](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/1_draft_tn.jpg)](https://github.com/akira-tech/RFQ993471/blob/master/doc/architecture/1_draft.jpg)
[![System Architecture Final](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/architecture_tn.jpg)](https://github.com/akira-tech/RFQ993471/blob/master/doc/architecture/architecture.png)


## [Development](https://github.com/akira-tech/RFQ993471/tree/master/doc/reports)

Duration of this project (before the amendments) was too short to effectively use Scrum.
For this reason we proceeded with Kanban - an ideal Agile methodology for both short PoCs.

In our process we were continually
* collecting ideas via
  - daily meetings ([see the notes](https://github.com/akira-tech/RFQ993471/wiki/Meeting-Minutes))
  - [usability tests](https://github.com/akira-tech/RFQ993471/tree/master/doc/usability_test/2015062901)
  - discussions with people outside the project work team
* converting the new ideas into Kanban stories in Jira ([see the project reports](https://github.com/akira-tech/RFQ993471/tree/master/doc/reports))
* discussing, prioritizing and moving stories from the backlog to the development swimlane
* reevaluating the results the next day

[![Cumulative Flow](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/cumulative_flow_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/reports/GSA-18F%20Cumulative%20Flow%20Diagram.pdf)
[![Team Load](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/team_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/reports/GSA-18F%20Pie%20Chart%20Assignees.pdf)

## [Architecture](https://github.com/akira-tech/RFQ993471/tree/master/doc/architecture)

The resulting architecture is presented on the following diagram:

![Akira Technologies Agile BPA PoC Architecture](https://github.com/akira-tech/RFQ993471/blob/master/doc/architecture/architecture.png)

### [Overall System](https://github.com/akira-tech/RFQ993471/tree/master/doc/architecture)

* All system components are hosted in the cloud
* DockerHub hosts publicly available image for the application
* Github hosts the code
* CloudCheckr aggregates continuous monitoring information
* AWS hosts the key system components:
  * ELB: balances load between two servers in different availability zones, reports downtime
  * CloudWatch, CloudTrail: continually monitor the systems
  * Control Server: runs [Jenkins CI](https://jenkins-ci.org/), [Docker](https://www.docker.com/), [Jasmine](http://jasmine.github.io/), [Ansible](http://www.ansible.com/home)
  * App servers run Docker, [Meteor](https://www.meteor.com/) including [MongoDB](https://www.mongodb.com/)

[![AWS EC2](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/aws_ec2_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/architecture/aws_ec2.png)
[![AWS ELB](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/aws_elb_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/architecture/aws_elb.png)

### [Code](https://github.com/akira-tech/RFQ993471/tree/master/doc/continuous_integration)

* Each developer pushes the code to Github.
* Upon every code push GitHub notifies [Jinkins Contiuous integration system](http://agilebpa-ci.akira-tech.com:8080) about the new code
* Jenkins pulls the new code, runs [Jasmine](http://jasmine.github.io/) [unit testing](/tests).
  * If tests fail Jenking notifies the commit author about the problems by email
  * If tests succeed Jenkins
    * builds docker image
    * pushes it to [Docker Hub](https://registry.hub.docker.com/u/akiratech/rfq993471/)
    * runs [Ansible playbook](https://github.com/akira-tech/RFQ993471/blob/master/playbook.yml) to perform rolling deploy of the image from DockerHub to the two application server

[![Jenkins Build](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/jenkins_build_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/continuous_integration/full_log.txt)


### [User Interface](https://github.com/akira-tech/RFQ993471/tree/master/doc/design)

* User's HTTP request goes to the ELB
* ELB balances the load between two application servers using
* Each app server checks local cache for data availability. We use cache to reduce the number of calls to http://open.fda.gov and improve the performance. In this PoC we use MongoDB for chaching, though in all other projects we stick with Redis or Memcached.
* If the data is not in the cache a call is made to https://api.fda.gov/drug/label.json?api_key=AKIRA_API_KEY&search=effective_time:[20130601+TO+20140731]+AND+_exists_:warnings&limit=100, data processed, returned to the client and cached
* Data is returned to the user via Meteor collections (operating on top of websockets) and presented using D3.js
* The application also exposes data via REST API: http://agilebpa.akira-tech.com/words-frequency.json](http://agilebpa.akira-tech.com/words-frequency.json

### [Continuous monitoring](https://github.com/akira-tech/RFQ993471/tree/master/doc/continuous_monitoring)

We use the following systems to provide continuous uptime, performance and security monitoring:
* __AWS CloudWatch__: systems parameters monitoring (CPU Load, disk space etc)
* __AWS ELB__: website(s) uptime monitoring (in combination with CloudWatch)
* __AWS SNS__:event notifications
* __AWS CloudTrail__: security and system changes monitoring
* __CloudCheckr__: monitoring information aggregator

[![CloudCheckr](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/cloud_checkr_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/continuous_monitoring/cloud_checkr.png)
[![CloudTrail](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/cloud_trail_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/continuous_monitoring/cloud_trail.png)
[![Change Notification](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/change_notification_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/continuous_monitoring/change_notification.png)
[![Changes Review](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/review_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/continuous_monitoring/review.png)
[![Site Down Notification](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/site_down_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/continuous_monitoring/site_down.png)
[![CloudWatch](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/cloud_watch_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/continuous_monitoring/cloud_watch.png)


[These screenshots provide a good idea of what kind of monitoring information we're getting from this powerful combination](/doc/continuous_monitoring).

## [Application](https://github.com/akira-tech/RFQ993471/tree/master/doc/responsive_and_multiplatform)

The resulting prototype has the following characteristics:
* Uses cutting-edge technologies and approaches including, but not limited to HTML5, CSS3, Less, Bootstrap, jQuery, Websockets, D3.js, REST, Meteor, MongoDB, Cordova/Phonegap
* Runs in a web browser as well as an iOS or Android application
* Fully-responsive
* Fully 508-compliant (note there are no errors and contrast errors, we also included the text version of the word cloud for JAWS and similar systems)

[![508 Compliance](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/508_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/508/508.png)
[![Wide Layout](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/chrome_wide_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/responsive_and_multiplatform/chrome_wide_2.png)
[![Narrow Layout](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/chrome_narrow_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/responsive_and_multiplatform/chrome_narrow_1.png)
[![iOS Application](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/ios_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/responsive_and_multiplatform/ios_1.png)
[![Android Application](https://github.com/akira-tech/RFQ993471/blob/master/doc/thumbnails/android_tn.png)](https://github.com/akira-tech/RFQ993471/blob/master/doc/responsive_and_multiplatform/android.png)

Learn more about our approach in [Github Wiki](https://github.com/akira-tech/RFQ993471/wiki).

[Instructions to install and run](https://github.com/akira-tech/RFQ993471/wiki/Installing-and-Running-the-Application) the application locally using various methods.
