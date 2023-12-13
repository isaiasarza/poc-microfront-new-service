const NextFederationPlugin = require("@module-federation/nextjs-mf");
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  console.log("LOGIN_HOST:", process.env.LOGIN_HOST);
  const location = isServer ? "ssr" : "chunks";
  return {
    //login: `login@${process.env.LOGIN_HOST}/_next/static/${location}/remoteEntry.js`,
    login: `login@https://poc-microfront-login-50lpg7u1s-daniarzas-projects.vercel.app/_next/static/${location}/remoteEntry.js`,
    //home: `home@${process.env.HOME_HOST}/_next/static/${location}/remoteEntry.js`,
    home: `home@https://poc-microfront-home-1igahlqri-daniarzas-projects.vercel.app/_next/static/${location}/remoteEntry.js`,
    s1: `s1@${process.env.S1_HOST}/_next/static/${location}/remoteEntry.js`,
    s2: `s2@${process.env.S2_HOST}/_next/static/${location}/remoteEntry.js`,
    s3: `s3@${process.env.S3_HOST}/_next/static/${location}/remoteEntry.js`,
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
