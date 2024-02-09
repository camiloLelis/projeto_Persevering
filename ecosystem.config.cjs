module.exports = {
    apps: [
      {
        name: 'api-login',
        script: './app.js',
        instances: 1,
        autorestart: true,
        watch: true,
        ignore_watch: ['./prisma/dev.db','.git', '.gitignore', 'dev.db-journal'],
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'development',
        },
        env_production: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  