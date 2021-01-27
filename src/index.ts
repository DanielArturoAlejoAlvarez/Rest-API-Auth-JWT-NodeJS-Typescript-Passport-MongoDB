import app from './app'

function main() {
  app.listen(app.get('port'))
  console.log('Server running in port: ', app.get('port'))
}

main()

