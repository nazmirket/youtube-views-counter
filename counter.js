const configs = require('./configs.json')

const { google } = require('googleapis')

const { OAuthClient, auth, refresh } = require('./auth')

const youtube = google.youtube('v3')

const interval = {
   code: null,
   refresh() {
      this.clear()
      this.set()
   },
   set() {
      this.code = setInterval(sync, configs.PACE)
   },
   clear() {
      clearInterval(this.code)
   },
}

async function sync() {
   console.log('syncing...')
   try {
      await new Promise(function (resolve, reject) {
         youtube.videos
            .list({
               auth: OAuthClient,
               part: ['statistics', 'snippet'],
               id: configs.VIDEO_ID,
            })
            .then(function (res) {
               const video = res.data?.items?.pop()

               const newCount = video?.statistics?.viewCount
               const title = video?.snippet.title

               try {
                  const oldCount = title.match(/Bu video (.*) kez izlendi/)[1]
                  if (oldCount === newCount) {
                     console.log('skipping...')
                     return resolve()
                  }
               } catch (error) {}

               youtube.videos
                  .update({
                     auth: OAuthClient,
                     part: 'snippet',
                     requestBody: {
                        id: configs.VIDEO_ID,
                        snippet: {
                           categoryId: video.snippet.categoryId,
                           title: `Bu video ${newCount} kez izlendi`,
                        },
                     },
                  })
                  .then(resolve)
                  .catch(reject)
            })
            .catch(reject)
      })
   } catch (error) {
      await refresh()
      interval.refresh()
   }
}

async function init() {
   await auth()
   interval.set()
}

init()
