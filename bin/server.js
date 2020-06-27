 /**
  * 
  */
const app = require('../app')
const debug = require('debug')('node-blog:server')
const http = require('http')

const port = normalizePort(process.env.PORT || '3000')

app.set('port', port)

/**
 * 创建一个http服务
 */

 const server = http.createServer(app)

 /**
  * 监听端口，所有的网络接口
  */

  server.listen(port, () => {
      const host = server.address().address
      const port = server.address().port

      console.log("应用实例，访问地址为http://%s:%s", host, port)
  })
  server.on('error', onError)
  server.on('listening', onListening)

  /**
   * 将一个数字作为标准的端口
   */

   function normalizePort(val) {
       const port = parseInt(val, 10)

       if (isNaN(port)) {
           return val
       }

       if (port >= 0) {
           return port
       }
       return false
   }

   /**
    * 事件监听http服务 error事件
    */

    function onError(error) {
        if (error.syscall !== 'listen') {
            throw error;
        }

        const bind = typeof port === 'string'
            ? 'Pipe' + port
            : 'Port' + port
        
        switch (error.code) {
            case 'EACCES':
                console.error(bind + 'requeres elevated privileges')
                process.exit(1)
                break
            case 'EADDRINUSE':
                console.error(bind + 'is already in use')
                process.exit(1)
                break
            default:
                throw error;
        }
    }

    /**
     * http服务监听 listening事件
     */

     function onListening() {
         const addr = server.address()
         const bind = typeof addr === 'string'
            ? 'pipe' + addr
            : 'port' + addr.port
        debug('Listening on' + bind)
     }