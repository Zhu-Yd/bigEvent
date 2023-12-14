const base_url = 'http://localhost:63342/QuantTra/bigEvent_project'

$.ajaxPrefilter(function (options) {
    options.url = "http://127.0.0.1:3007/" + options.url
    console.log(options.url)
})