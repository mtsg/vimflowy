import * as express from 'express';
import * as webpack from 'webpack';
import * as WebpackDevServer from 'webpack-dev-server';

import logger from '../assets/ts/utils/logger';

import { getProdConfig, getDevConfig, staticDir, publicPath } from './webpack_configs';

export async function buildProd(socketServerAddress: null | string = null) {
  await new Promise((resolve, reject) => {
    webpack(getProdConfig(socketServerAddress), function(err) {
      if (err) { return reject(err); }
      resolve();
    });
  });
}

export function makeDevServer(port: number, socketServerAddress: null | string = null, extraConf: any = {}) {
  const server = new WebpackDevServer(webpack(getDevConfig(socketServerAddress)), {
    publicPath: publicPath,
    hot: true,
    stats: false,
    historyApiFallback: true,
    ...extraConf
  });

  const app: express.Application = (server as any).app;
  app.use(express.static(staticDir));

  server.listen(port, 'localhost', (err: Error) => {
    if (err) { return logger.error(err); }
    logger.info(`Listening at http://localhost:${port}`);
  });
}
