const redis = require('async-redis');
const { GenericContainer } = require('testcontainers');
const Docker = require('dockerode');

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
        const docker = new Docker();
        const info = await docker.info();
        const serverVersion = info.ServerVersion;
        await expect(serverVersion).toContain('testcontainerscloud');
    });
});