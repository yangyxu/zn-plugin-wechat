zn.define([
    './base',
    './menu',
    './message',
    './oauth',
    './template',
    './ticket',
    './user',
    './sns'
], function (
    base,
    menu,
    message,
    oauth,
    template,
    ticket,
    user,
    sns
){
    return {
        base: base,
        menu: menu,
        message: message,
        oauth: oauth,
        template: template,
        ticket: ticket,
        user: user,
        sns: sns
    }
});
