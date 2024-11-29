import { bytecodePlugin, defineConfig, externalizeDepsPlugin, loadEnv } from 'electron-vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'node:path'

export default ({ mode }): ReturnType<typeof defineConfig> => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    main: {
      plugins: [externalizeDepsPlugin(), bytecodePlugin()]
    },
    preload: {
      plugins: [externalizeDepsPlugin(), bytecodePlugin()]
    },
    renderer: {
      plugins: [
        viteStaticCopy({
          targets: ['core', 'barcode']
            .map((module) => ({
              src: path.resolve(
                __dirname,
                `./node_modules/@scandit/web-datacapture-${module}/sdc-lib/**/*`
              ),
              dest: './library/engine'
            }))
            .concat([
              {
                src: path.resolve(__dirname, `./sdc-license.data`),
                dest: './data'
              }
            ])
        })
      ]
    }
  })
}
