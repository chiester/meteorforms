module.exports = {
  servers: {
    one: {
      host: 'YOUR IP',
      username: 'YOUR USERNAME',
      pem: 'YOUR PEM PATH',
      port: 8500 // or whatever port you want to use
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'YOUR APP NAME',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'YOUR URL',
      MONGO_URL: 'mongodb://localhost/meteor',
    },

    dockerImage: 'abernix/meteord:base',
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};
