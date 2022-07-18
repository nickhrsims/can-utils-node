module.exports = function (api) {
    api.cache(false);
    return {
        presets: [
            '@babel/preset-typescript',
            [
                '@babel/preset-env',
                {
                    targets: {
                        esmodules: true,
                        node: 'current',
                    },
                },
            ],
        ],
        plugins: [
            [
                'module-resolver',
                {
                    extensions: ['.js', '.ts'],
                    root: ['./src'],
                },
            ],
        ],
    };
};
