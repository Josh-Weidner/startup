# Github Lecture:
    When commits are made that effect the same line of code that you are trying to make changes to and commit, a conflict will occur. Your IDE will show you the code that is having conflicts and you can choose how to the merge the two changes.

# ec2
### URL
    https://basketflyer.com

### Command to connect to server from console
    ssh -i ~/Documents/cs260/cs260.pem ubuntu@basketflyer.com

# Console
    I learned that you can use "less" to see live activity of a file. You can also use functions within the console which is so cool. We even used a for loop!
    Console commands
    echo - Output the parameters of the command
    cd - Change directory
    mkdir - Make directory
    rmdir - Remove directory
    rm - Remove file(s)
    mv - Move file(s)
    cp - Copy files
    ls - List files
    curl - Command line client URL browser
    grep - Regular expression search
    find - Find files
    top - View running processes with CPU and memory usage
    df - View disk statistics
    cat - Output the contents of a file
    less - Interactively output the contents of a file
    wc - Count the words in a file
    ps - View the currently running processes
    kill - Kill a currently running process
    sudo - Execute a command as a super user (admin)
    ssh - Create a secure shell on a remote computer
    scp - Securely copy files to a remote computer
    history - Show the history of commands
    ping - Check if a website is up
    tracert - Trace the connections to a website
    dig - Show the DNS information for a domain
    man - Look up a command in the manual

# HTTPS
    You can access the Caddyfile using vi Caddyfile to enter in your domain name and create a secure connection to your website. ":wq" saves file that you are working on.
    "sudo caddy service restart" restarts the file and starts running your domain with secure connections.

# HTML
    On youtube their is an option to embed the video to a website and all you have to do is copy it into your html. 

## Command to Deliver Code to Domain
    ./deployFiles.sh -k ~/Documents/cs260/cs260.pem -h basketflyer.com -s startup
    The last element in this command routes the deliverable to startup on the domain: startup.basketflyer.com.

## CSS
    If you want a specific type of styling you can most likely find it on google open source. It is good etiquete to have on main.css and other css depending on the needs of the additional pages.
    Combinator	Meaning	Example	Description
    When selecting elements to apply styling you can use [parent] [descendant] or 
    [parent] > [direct child] or 
    [element sibling] ~ [element sibling] or 
    [element sibling] + [adjecent element sibling]
    You can also select and element plus its class using [element].[class]
