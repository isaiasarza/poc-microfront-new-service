const NextFederationPlugin = require("@module-federation/nextjs-mf");
// this enables you to use import() and the webpack parser
// loading remotes on demand, not ideal for SSR
const remotes = (isServer) => {
  const location = isServer ? "ssr" : "chunks";
  const shell = `shell@${process.env.SHELL_HOST}/_next/static/${location}/remoteEntry.js`;
  return {
    shell,
  };
};
module.exports = {
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: "s3",
        filename: "static/chunks/remoteEntry.js",
        exposes: {
          "./confirm-service-subscription":
            "./pages/confirm-service-subscription.js",
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
