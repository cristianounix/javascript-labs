import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { setTimeout } from 'node:timers/promises'
import { Transform, Readable } from 'node:stream'
import { TransformStream, WritableStream } from 'node:stream/web'
import csvtojson from 'csvtojson'

const PORT = 3000
// curl -N localhost:3000
createServer(async (req, res) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*',
  }
  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers)
    res.end()
    return
  }

  let items = 0
  req.once('close', () => console.log('connection was closed!', items))

  Readable.toWeb(createReadStream('./bla.csv'))
    .pipeThrough(Transform.toWeb(csvtojson()))
    .pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          const d = JSON.parse(Buffer.from(chunk))
          controller.enqueue(
            JSON.stringify({
              id: d.id,
              title: d.title,
            }).concat('\n')
          )
        },
      })
    )
    .pipeTo(
      new WritableStream({
        async write(chunk) {
          await setTimeout(1000)
          items++
          res.write(chunk)
        },
        close() {
          res.end()
        }
      })
    )

  res.writeHead(200, headers)
}).listen(PORT)
  .on('listening', _ => console.log('server running at ', PORT))