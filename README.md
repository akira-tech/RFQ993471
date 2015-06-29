# RFQ993471 - Agile BPA PoC

## Summary

  This project demonstrates Akira Technologies capabilities in developing web application using cutting-edge technologies and Agile methodology

## Evaluation Criteria

### Team Leader

### Project Team

### Understanding people needs
  Akira identified the following categories of users and their needs:
  * Researchers - looking for data visualization, ways to export both data and imagery
  * Developers - looking for data export functionality using one of public standard protocols such as REST
  * General public - looking for something interactive, entertaining and in general interesting
  Akira included representatives from all 3 groups of people to brainstorm about the idea for the project.
  Discussions with these groups of people lead to the current product functionality and UI design

### Human-centered design techniques
  Akira selected the following techniques for this project:
  * Focus group. Please see the minutes from meetings in the documentation folder
  * Usability testing. The test plan and outcomes are provided in the documentation folder
  * Participatory design. The engaged groups of users were submitting their feedback in the form of Jira issues as well as informal format that was further converted into Jira issues

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

### Continuous integration system
  Jenkins.
  Available at

### Configuration management


### Continuous monitoring
 The following solutions are implemented for the continuous monitoring:
 * AWS CloudWatch - for systems parameters monitoring (CPU Load, disk space etc)
 * AWS ELB in combination with CloudWatch for the website(s) uptime monitoring
 * AWS SNS for event notifications
 * AWS CloudTrail for security and change monitoring
 * CloudCheckr aggregates information from all these systems to complete the continuous monitoring

### Containerization
  Docker

### REST API
  consumption
  Exposion

### Installation
  As a container
  As a github checkout

### Licenses


- Development

  1. Clone this repo to `<yourapp>`

    `git clone https://github.com/akira-tech/RFQ993471.git <yourapp>`

  2. run project
    `cd <yourapp>`    
    `meteor`    

- Deploy 
  
  1. Clone this repo to `<yourapp>`

    `git clone https://github.com/akira-tech/RFQ993471.git <yourapp>`

  2. Deploy project
    `cd <yourapp>`    
    `meteor deloy <site url>`    

- code

  server/methods/api.js
    - drug_label
      It's get the data from FDA service url. 
      The data have duplicated words and have bad words like auxiliary verb. 
      After we get the data, we remove the bad words and get uique data.
      Every word has two attributes. key, value.
      Key is word name, value is frequency of word in sentence.
      We returned the json object that converted array. 

  client/home/home.js

    It's to show the data visualation using d3 word clud libary.
    We create the d3 object and called the drug_label api. 
    after we get the data , it's displayed in screen.
      
- test
  We installed jasmine, vector plugin to the project. 
  Jasmine is very easy to take the unit test. 


