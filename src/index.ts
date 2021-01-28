import app from './app'
import './database'

/**
 * Starting our application
 */
function main() {
  app.listen(app.get('port'))
  console.log('Server running in port: ', app.get('port'))
}

main()

