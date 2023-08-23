const redis = require('async-redis');
const { GenericContainer } = require('testcontainers');
const { OhNoMessage, getRuntimeLogo } = require('./prettyStrings');
const { getContainerRuntimeClient } = require('testcontainers/build/container-runtime');

describe('GenericContainer', () => {
    let container;
    let redisClient;

    beforeAll(async () => {
        container = await new GenericContainer('redis')
            .withExposedPorts(6379)
            .start();

        redisClient = redis.createClient(
            container.getMappedPort(6379),
            container.getHost(),
        );
    });

    afterAll(async () => {
        await redisClient.quit();
        await container.stop();
    });

    it('works', async () => {
        await redisClient.set('key', 'val');
        let value = await redisClient.get('key');
        await expect(value).toBe('val');
    });

    it('tcc cloud engine', async () => {
        const runtime = await getContainerRuntimeClient();
        const info = runtime.info.containerRuntime;
        const serverVersion = info.serverVersion;

        const containsCloud = serverVersion.includes('testcontainerscloud');
        const containsDesktop = serverVersion.includes('Testcontainers Desktop');

        if (!(containsCloud || containsDesktop)) {
            throw new Error(OhNoMessage);
        }
    
        let expectedRuntime = "Testcontainers Cloud";
        if (!containsCloud) {
            expectedRuntime = info.operatingSystem;
        }
        if (containsDesktop) {
            expectedRuntime += " via Testcontainers Desktop app";
        }
    
        console.debug(getRuntimeLogo(expectedRuntime));
    });
});