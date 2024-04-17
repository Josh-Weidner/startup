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
    for service: ./deployService.sh -k ~/Documents/cs260/cs260.pem -h basketflyer.com -s startup
    The last element in this command routes the deliverable to startup on the domain: startup.basketflyer.com.

## CSS
    If you want a specific type of styling you can most likely find it on google open source. It is good etiquete to have on main.css and other css depending on the needs of the additional pages.
    Combinator	Meaning	Example	Description
    When selecting elements to apply styling you can use [parent] [descendant] or 
    [parent] > [direct child] or 
    [element sibling] ~ [element sibling] or 
    [element sibling] + [adjecent element sibling]
    You can also select and element plus its class using [element].[class]
    You can also select and id of a specific element using #[id]
    You can even use pseudo selectors, for example section:hover. when you hover your mouse over section the style then applies.

## Web Framework
    Babel is a transpiler that converts your JSX into Javascript.
    When using JSX you break all the HTML elements into components in JSX.
    With react you create functions that are components and you cna insert parameters to change what the component displays.


final review
-Which of the following is NOT true about Linux Daemon? Cannot fork other processes.
-Why is hashing stored passwords important? security
-HTTP status codes in the 300 range are for? Content redirects or caching.
-What does the command "NPM install ws" Not do? Adds template code for websockets to your JavaScriptt
-Port 80 is reserved for? HTTP
-What is NOT a standard HTTP header? Language
-Given the following code what will console.log print? CLient:Server:Hello
-What will component A initiallt display? tacofish
-What component wil the URL "/burger" render? B
-Cookies allow: A server to store data on the client
-What is NOT a purpose of JSX? To combine CSS, HTML, and JavaScript
-What document matches this MongoDB query? { name: "Walke", score: -55}
-Which Express middleware will match this fetch request? app.delete(/fav\/(.*)/, () => {})
-For the request [GET] /fav/george what is logged? Paul georage John
-You can use fetch in front-end and back-end code. True
-What value does webSocket add to HTTP? It is peer to peer instad of client to server

