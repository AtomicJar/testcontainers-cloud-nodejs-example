const { Client } = require('pg');
const { PostgreSqlContainer} = require('@testcontainers/postgresql');
const { getContainerRuntimeClient } = require('testcontainers/build/container-runtime');
const {fail} = require("assert");

const logo = "\n" +
    "████████╗███████╗███████╗████████╗ ██████╗ ██████╗ ███╗   ██╗████████╗ █████╗ ██╗███╗   ██╗███████╗██████╗ ███████╗ \n" +
    "╚══██╔══╝██╔════╝██╔════╝╚══██╔══╝██╔════╝██╔═══██╗████╗  ██║╚══██╔══╝██╔══██╗██║████╗  ██║██╔════╝██╔══██╗██╔════╝ \n" +
    "   ██║   █████╗  ███████╗   ██║   ██║     ██║   ██║██╔██╗ ██║   ██║   ███████║██║██╔██╗ ██║█████╗  ██████╔╝███████╗ \n" +
    "   ██║   ██╔══╝  ╚════██║   ██║   ██║     ██║   ██║██║╚██╗██║   ██║   ██╔══██║██║██║╚██╗██║██╔══╝  ██╔══██╗╚════██║ \n" +
    "   ██║   ███████╗███████║   ██║   ╚██████╗╚██████╔╝██║ ╚████║   ██║   ██║  ██║██║██║ ╚████║███████╗██║  ██║███████║ \n" +
    "   ╚═╝   ╚══════╝╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝╚══════╝ \n" +
    "  \n" +
    "  Congratulations on running your first test! 🎉\n" +
    "  Runtime used: \n" +
    "      ::::::\n" +
    " \n" +
    "  You can now return to the website to complete your onboarding.\n" +
    " \n" +
    "";

const ohNo = "" +
    " ██████╗ ██╗  ██╗    ███╗   ██╗ ██████╗               ██╗\n" +
    "██╔═══██╗██║  ██║    ████╗  ██║██╔═══██╗    ██╗      ██╔╝\n" +
    "██║   ██║███████║    ██╔██╗ ██║██║   ██║    ╚═╝█████╗██║ \n" +
    "██║   ██║██╔══██║    ██║╚██╗██║██║   ██║    ██╗╚════╝██║ \n" +
    "╚██████╔╝██║  ██║    ██║ ╚████║╚██████╔╝    ╚═╝      ╚██╗\n" +
    " ╚═════╝ ╚═╝  ╚═╝    ╚═╝  ╚═══╝ ╚═════╝               ╚═╝\n" +
    "                                                         ";

const CLOUD_DOCKER_LABEL = "cloud.docker.run.version";

describe('GenericContainer', () => {
    it('tcc cloud engine', async () => {
        const containerRuntime = await getContainerRuntimeClient();
        const info = containerRuntime.info;
        const { serverVersion, operatingSystem, labels } = info.containerRuntime;

        const isWithCloudLabel = labels && labels.find(label => label.includes(CLOUD_DOCKER_LABEL));
        const isTestcontainersDesktop = serverVersion.includes('Testcontainers Desktop');
        const isTestcontainersCloud = serverVersion.includes('testcontainerscloud');
        if (!(isTestcontainersDesktop || isTestcontainersCloud || isWithCloudLabel)) {
            console.log(ohNo)
            fail()
        }

        let runtimeName = "Testcontainers Cloud";
        if (!isTestcontainersCloud && !isWithCloudLabel) {
            runtimeName = operatingSystem;
        }
        if (serverVersion.includes("Testcontainers Desktop")) {
            runtimeName += " via Testcontainers Desktop";
        }

        console.log(logo.replace("::::::", runtimeName));
    });

    it('create postgresql container', async () => {
        const initScript = `
            create table guides
            (
                id    bigserial     not null,
                title varchar(1023) not null,
                url   varchar(1023) not null,
                primary key (id)
            );

            insert into guides(title, url)
            values ('Getting started with Testcontainers',
                    'https://testcontainers.com/getting-started/'),
                   ('Getting started with Testcontainers for Java',
                    'https://testcontainers.com/guides/getting-started-with-testcontainers-for-java/'),
                   ('Getting started with Testcontainers for .NET',
                    'https://testcontainers.com/guides/getting-started-with-testcontainers-for-dotnet/'),
                   ('Getting started with Testcontainers for Node.js',
                    'https://testcontainers.com/guides/getting-started-with-testcontainers-for-nodejs/'),
                   ('Getting started with Testcontainers for Go',
                    'https://testcontainers.com/guides/getting-started-with-testcontainers-for-go/'),
                   ('Testcontainers container lifecycle management using JUnit 5',
                    'https://testcontainers.com/guides/testcontainers-container-lifecycle/')
            ;
        `

        const container = await new PostgreSqlContainer("cgr.dev/chainguard/postgres:latest")
            .withCopyContentToContainer([{content: initScript, target: '/docker-entrypoint-initdb.d/init.sql'}])
            .start();
        const client = new Client({
            connectionString: container.getConnectionUri(),
        });
        await client.connect();

        const result = await client.query("SELECT COUNT(*) FROM guides");
        expect(result.rows[0]).toEqual({ "count": "6" });

        await client.end();
        await container.stop();
    });
});