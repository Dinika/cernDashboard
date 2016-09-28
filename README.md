What is it?
-----------------

The cernDashboard is a web-based dashboard that helps in visualization of Openstack cloud resources at CERN. I built it as an Openlab Summer Student. 

Contributors
-----------------

.Ricardo Brito Da Rocha
.Cristovao Cordeiro
.Jan Van Eldik
and Me (Dinika Saxena)

Where can you get it from?
---------------------------
I've made the code public. You can fork/clone it from my GitHub/Gitlab repo. Here are the links:
GitLab
https://:@gitlab.cern.ch:8443/dsaxena/cern-dashboard.git

GitHub
https://github.com/Dinika/cernDashboard.git

This version
-----------------
I'm still working on the dashboard, as such the code right now is not very polished. It's functional, however. I'm fixing things every week. Right now there's only one branch (the master branch), but I'm soon going to add another which will contain the code for a more responsive dashboard.

Directory Structure
---------------------
You'll find the following directories:
1. htmlDocs - contains the html files. Here's where you'll find index.html which displays the 'homepage' of the dashboard
2. css - contains the external stylesheets. I have to create and add a few more of these files.
3. imgs - contains the images used in the dashboard. The favicon is also present here.
4. js - contain files that have JavaScript code.
5. Samples - contains code for some sample graphs and charts that I created while learning d3.js and dimple. They are only mockups. Feel free to remove them.

Technologies Used
------------------
HTML5
CSS
JavaScript
d3.js
dimple (An API for d3.js)
I'm working on adding Bootstrap to the code. Hopefully, it'll be done soon.

Bugs/Issues that need to be fixed
----------------------------------

1. On returning to the normal mode after the fullscreen mode, the two boxes to the right of the screen mess up in size.

2. The z-height of faulty VMs (represented by hot-pink bubbles) needs to be such that they always appear over other VMs (blue/yellow bubbles).   

3. When a new bubble is clicked, some of the information about the bubble that was clicked before it retains in the rectangular box on the right-side of the screen.

4. The code only works for 2 faulty VMs right now. I have to add a loop that goes over all the bubbles to check if they are faulty.

5. The box on the bottom right of the screen needs to have some relevant content. For that matter, even the horizontal navigation bar on the top should have more appropriate tab names.

6. The dashboard is not responsive.

7. This is more of a reminder to myself. I have to add comments in my code.

I won't be surprised if somebody finds bugs that are not listed above. These are just the ones that I can think of right now. 


Leave your feedback/suggestions/complains at
---------------------------------------------
dinikasaxenas@gmail.com 