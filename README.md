# testcontainers-cloud-nodejs-example

This is an example repository with a simple test confirming proper connection from Testcontainers Desktop (or the CI agent) to your [Testcontainers Cloud](https://app.testcontainers.cloud) account.
For details on how to bootstrap Testcontainers in an actual project, please refer to the [Testcontainers Node Quickstart](https://testcontainers.com/guides/getting-started-with-testcontainers-for-nodejs/).

## Clone the repository and run the first Testcontainers test suite

```shell
git clone https://github.com/AtomicJar/testcontainers-cloud-nodejs-example
cd testcontainers-cloud-nodejs-example
make test
```

The `Make` command will install the dependencies and run the test suite.

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

## (optional) Use Testcontainers Desktop to easily debug the database

[Testcontainers Desktop](https://testcontainers.com/desktop/) helps developers with common tasks such as debugging your
Testcontainers-powered dependencies. Let's practice!

The tests in this project create a PostgreSQL database and populate it with sample data. You can
[set a fixed port](https://newsletter.testcontainers.com/announcements/set-fixed-ports-to-easily-debug-development-services)
for the `postgres` service, then [freeze containers shutdown](https://newsletter.testcontainers.com/announcements/freeze-containers-to-prevent-their-shutdown-while-you-debug)
to easily connect to the database from your IDE after your tests run.

See if you can inspect the database. Username: `test`. Password: `test`.
