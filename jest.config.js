module.exports = {
    moduleDirectories: ['node_modules', 'src'],
    preset: 'ts-jest',
    setupFiles: ['dotenv/config'],
    testEnvironment: 'node',
    testRegex: 'test\\.(smoke|unit|integration)?\\.ts$',
};
