# Sterling

Sterling is a web-based visualization for Alloy, providing more customizable
visualizations than the built-in Alloy visualizer. Additionally, the Sterling
architecture is designed in a way that allows other model checking tools to
easily make use of its visualization capabilities.

Please refer to the [wiki](https://github.com/alloy-js/sterling-ui/wiki) for 
complete documentation regarding both the development and usage of Sterling UI.

## Setting up a development environment

Sterling UI is a single page application (SPA) built using 
[React](https://reactjs.org/) and 
[Create React App](https://create-react-app.dev/). The environment provided
by Create React App supports a lot of useful features such as hot reloading and
automatic optimization during deployment.

To set up the Sterling UI development environment from scratch, run the 
following commands

```bash
# Clone the repository
git clone https://github.com/alloy-js/sterling-ui.git

# Move in to the repository directory
cd sterling-ui

# Install all required libraries
npm install
```

Next, spin up the app in development mode by running

```bash
npm start
```

This will launch a browser window and navigate to 
[http://localhost:3000](http://localhost:3000).

If [Sterling](https://github.com/alloy-js/sterling) (or some other tool that
is providing data) is already running and serving data 
[from the correct port](#proxying-api-requests),
the connection between the tool and visualizer should be established and
you're ready to begin development. If you open Sterling after opening the web
page, you will need to refresh the page to establish the connection. 

### Proxying API Requests

In a production build, Sterling itself acts as a local web server that serves
the Sterling UI web pages and handles API requests (such as the user requesting
the next Alloy solution).

During development, however, the Sterling UI web pages are served from a
separate server (one that is created when you run the `npm start` command) so
that we can have nice development features like live reloading. When this server
receives an API request from Sterling UI (such as the user requesting the next
Alloy solution), it won't know what to do.

So, in order to allow Sterling UI and Sterling to communicate during development,
we need to establish the development server as a 
[proxy](https://create-react-app.dev/docs/proxying-api-requests-in-development/).
Essentially what this means is that the development server acts as a middle-man.
Whenever it receives a request from Sterling UI that it does not recognize, it
will simply forward that request to whatever port you've specified. Conversely,
when it receives a request from Sterling, it will forward it to Sterling UI.

Sterling UI is served through port 3000, and will forward requests that it does
not recognize to port 4000. To change this port, simply modify the `proxy`
variable in the [package.json](package.json) file.

Finally, the current Sterling implementation simply chooses a random available
port through which to serve the Sterling UI and API requests, and so during
development you must explicitly use port 4000 by using the following command to
launch Sterling:

```bash
java -jar Sterling-0.3.1.jar -p 4000
```
