# testcontainers-cloud-nodejs-example

The current repository helps you to verify that you configured your [Testcontainers Cloud][tcc] agent correctly in your local environment.

## Clone the repository and run the first Testcontainer test suite

```
git clone https://github.com/AtomicJar/testcontainers-cloud-nodejs-example
cd testcontainers-cloud-nodejs-example
make test
```

The `Make` command will install the dependencies and run the test suite.

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

```shell
Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        10.065 s
Ran all test suites.
                                                     /
                                                   /////////
                                                ///////////////
                                               /////////////////
                                                  /////////////
                                                 %%   ////   %
                                                 %%    //   %%
                                               %%      //      %
                                             %%        ////      %
                                             %     /////////     %
                                              % /////////////// %%
                                                %%%%%%%%%%%%%%%

                /%%%%%%    /%%                             /%%              /%%%%%
               /%%__  %%  | %%                            |__/             |__  %%
              | %%  \\ %% /%%%%%%    /%%%%%%  /%%%%%%/%%%%  /%%  /%%%%%%%      | %%  /%%%%%%   /%%%%%%
              | %%%%%%%%|_  %%_/   /%%__  %%| %%_  %%_  %%| %% /%%_____/      | %% |____  %% /%%__  %%
              | %%__  %%  | %%    | %%  \\ %%| %% \\ %% \\ %%| %%| %%       /%%  | %%  /%%%%%%%| %%  \\__/
              | %%  | %%  | %% /%%| %%  | %%| %% | %% | %%| %%| %%      | %%  | %% /%%__  %%| %%
              | %%  | %%  |  %%%%/|  %%%%%%/| %% | %% | %%| %%|  %%%%%%%|  %%%%%%/|  %%%%%%%| %%
              |__/  |__/   \\___/   \\______/ |__/ |__/ |__/|__/ \\_______/ \\______/  \\_______/|__/


              Congratulations on running your first test on Testcontainers Cloud! 🎉
              You can now return to the website to complete your onboarding.
```

Agent status:

![agent-running](./docs/active-connection.png)

[tcc]: https://testcontainers.cloud/
[tcc-download]: https://app.testcontainers.cloud/start/download?mode=update
