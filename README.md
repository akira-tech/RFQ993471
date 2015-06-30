# RFQ993471 - Agile BPA PoC

## Summary

  This project demonstrates Akira Technologies capabilities in developing web application using cutting-edge technologies and Agile methodology

## Evaluation Criteria

### Team Leader

### Project Team

### Understanding people needs
  Akira identified the following categories of users and their needs:
  * __Researchers__ - looking for data visualization, ways to export both data and imagery
  * __Developers__ - looking for data export functionality using one of public standard protocols such as REST
  * __General public__ - looking for something interactive, entertaining and in general interesting
  Akira included representatives from all 3 groups of people to brainstorm about the idea for the project.
  Discussions with these groups of people lead to the current product functionality and UI design

### Human-centered design techniques
  Akira selected the following techniques for this project:
  * __Focus group__. Please see the minutes from meetings in the documentation folder
  * __Usability testing__. The test plan and outcomes are provided in the documentation folder
  * __Participatory design__. The engaged groups of users were submitting their feedback in the form of Jira issues as well as informal format that was further converted into Jira issues

### Design Style Guide
  All stages of the UI design process are illustrated in the doc/design folder.
  The design style guide is provided as a combination of the design image (3_design_X.png) and 4_design_style_guide.txt document.

### Usability Tests

### Iterative approach
  Jira, Kanban etc

### Prototype
  Responsive design
  Works on mobile devices

### Technologies
  Here is a short list of the most important technologies used in this project: HTML5, CSS3, Less, Bootstrap, jQuery, Websockets.io, D3, Responsive, REST API, Meteor, Node.js

### Deployment
  The prototype is deployed in Amazon Web Services (AWS) IaaS.

### Unit tests
  Top-right corner

### Continuous integration system
  Jenkins.
  Available at

### Configuration management


### Continuous monitoring
 The following solutions are implemented for the continuous monitoring:
 * __AWS CloudWatch__ - for systems parameters monitoring (CPU Load, disk space etc)
 * __AWS ELB__ in combination with CloudWatch for the website(s) uptime monitoring
 * __AWS SNS__ for event notifications
 * __AWS CloudTrail__ for security and change monitoring
 * __CloudCheckr__ aggregates information from all these systems to complete the continuous monitoring

### Containerization
  Docker

### REST API
  consumption
  Exposion

### Installation
#### As a container
#### As a github clone (for development purposes)
  `git clone https://github.com/akira-tech/RFQ993471.git <yourapp>`
#### Run project
  `curl https://install.meteor.com/ | sh` # unless you have it already installed, see <a href="https://www.meteor.com/install">https://www.meteor.com/install</a>
  `cd <yourapp>`
  `meteor`

### Licenses

- Deploy 
  
  1. Clone this repo to `<yourapp>`

    `git clone https://github.com/akira-tech/RFQ993471.git <yourapp>`

  2. Deploy project
    `cd <yourapp>`    
    `meteor deloy <site url>`    

### Other Notes

#### 508 Compliance

Just like with other Akira solutions we implemented 508 compliance in this small app.
You have review the compliance with <a href="https://wave.webaim.org/toolbar/">Webaim WAVE Toolbar</a> (please do not use the online version).
The results of validation are shown below:
