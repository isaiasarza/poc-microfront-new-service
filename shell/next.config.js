const NextFederationPlugin = require("@module-federation/nextjs-mf");
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  console.log(process.env.LOGIN_HOST);
  const location = isServer ? "ssr" : "chunks";
  return {
    login: `login@${process.env.LOGIN_HOST}/_next/static/${location}/remoteEntry.js`,
    home: `home@http://localhost:3002/_next/static/${location}/remoteEntry.js`,
    s1: `s1@http://localhost:3003/_next/static/${location}/remoteEntry.js`,
    s2: `s2@http://localhost:3004/_next/static/${location}/remoteEntry.js`,
    s3: `s3@http://localhost:3005/_next/static/${location}/remoteEntry.js`,
  };
};
module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "shell",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./globalStore": "./store/store.js",
        },
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: {
          exposePages: true,
        },
      })
    );

    return config;
  },
};
