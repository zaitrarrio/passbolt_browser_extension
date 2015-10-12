/**
 * This pagemod drives the dialog/iframe where the user enters the secret key password,
 * also called master password. It is used when encrypting, decrypting, signing, etc.
 */
var self = require('sdk/self');
var app = require('../main');
var pageMod = require('sdk/page-mod');

var masterPasswordDialog = pageMod.PageMod({
    include: 'about:blank?passbolt=masterInline*',
    contentStyleFile: [
        self.data.url('css/main_ff.css')
    ],
    contentScriptFile: [
        self.data.url('js/lib/jquery-2.1.1.min.js'),
        self.data.url('js/lib/ejs_production.js'),
        self.data.url('js/lib/uuid.js'),
        self.data.url('js/template.js'),
        self.data.url('js/inc/port.js'),
        self.data.url('js/inc/request.js'),
        self.data.url('js/inc/keyring.js'),
        self.data.url('js/inc/event.js'),
        self.data.url('js/master.js')
    ],
    contentScriptWhen: 'ready',
    contentScriptOptions: {
        expose_messaging: false,
        addonDataPath: self.data.url(),
        templatePath: './tpl/keyring/master-password.ejs'
    },
    onAttach: function (worker) {
        app.workers['MasterPassword'] = worker;
        app.events.config.listen(worker);
        app.events.dispatch.listen(worker);
        app.events.masterpassword.listen(worker);
        app.events.template.listen(worker);
    }
});
exports.masterPasswordDialog = masterPasswordDialog;