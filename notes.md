# Github Lecture:
    When commits are made that effect the same line of code that you are trying to make changes to and commit, a conflict will occur. Your IDE will show you the code that is having conflicts and you can choose how to the merge the two changes.

# ec2
### URL
    https://basketflyer.com

### Command to connect to server from console
    ssh -i ~/Documents/cs260/cs260.pem ubuntu@basketflyer.com

# Console
    I learned that you can use "less" to see live activity of a file. You can also use functions within the console which is so cool. We even used a for loop!

# HTTPS
    You can access the Caddyfile using vi Caddyfile to enter in your domain name and create a secure connection to your website. ":wq" saves file that you are working on.
    "sudo caddy service restart" restarts the file and starts running your domain with secure connections.

# HTML
    On youtube their is an option to embed the video to a website and all you have to do is copy it into your html. 

## Command to Deliver Code to Domain
    ./deployFiles.sh -k ~/Documents/cs260/cs260.pem -h basketflyer.com -s startup
    The last element in this command routes the deliverable to startup on the domain: startup.basketflyer.com.
