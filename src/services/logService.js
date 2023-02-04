
function init() {
    // Raven.config('https://c588d42ee7524673b0ac26648f6eace5@o4504459567235072.ingest.sentry.io/4504459571888128',{
    // release: '0-0-0',
    // environment: 'development-test',
    // }). install()
}

function log(err) {
   console.log(err);
}

export default({
    init,
    log
})