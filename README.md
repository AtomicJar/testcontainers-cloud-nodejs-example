# testcontainers-cloud-nodejs-example

The current repository helps you to verify that you configured your [Testcontainers Cloud][tcc] agent correctly in your local environment.

## Clone the repository and run the first Testcontainer test suite

```
git clone https://github.com/AtomicJar/testcontainers-cloud-nodejs-example
cd testcontainers-cloud-nodejs-example
npm install
npm test
```

## Verify the agent is running

✅ __Passive State__: Agent awaiting a Testcontainers test to be executed. 

![agent-running](./docs/passive-connection.png)

✅ __Running State__: Agent connected to Testcontainers Cloud.

![agent-running](./docs/active-connection.png)

⚠️ __Stopped State__: Agent is stopped and will not accept connections.

Please, Start the agent to continue.

![agent-stopped](./docs/stopped.png)

To download the agent for local usage, check the [download page here][tcc-download].

## Run the test suite

`npm test`

### Your environment is correctly configured if

Test output:

![success](./docs/success.png)

Agent status:

![agent-running](./docs/active-connection.png)

[tcc]: https://testcontainers.cloud/
[tcc-download]: https://app.testcontainers.cloud/start/download?mode=update