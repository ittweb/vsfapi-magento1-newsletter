# vsfapi-magento1-newsletter
Questo modulo abilita su Vue Storefront API l'aggiunta dell'iscrizione alla newsletter su Magento 2.

## Installazione
Prima di usare questo modulo **installare la relativa versione per Magento 1** su repo ITTweb:
http://git.ittweb.net/gitlist/magento1-newsletter/

Dopo aver **installato il modulo per Magento 1**:
 - scarica il file della directory src nella root del progetto Vue Storefront API
 - modifica il file `vue-storefront-api/config/local.json` aggiungendo `magento1-subscribe` in `registeredExtensions`
 - modifica il `vue-storefront/config/local.json` cambiando l'endpoint della newsletter in `/api/ext/magento1-subscribe/subscribe`

Ora la newsletter di VSF-API è correttamente associata a Magento 1.

## Google reCaptcha
Per evitare potenziali attacchi agli ENDPOINT **abilita il Google reCaptcha**. Per abilitarlo, modifica il file vue-storefront-api/config/local.json aggiungendo una sezione come la seguente:
```
"googleRecaptcha": {
    "enabled": true,
    "secretKey": "SECRET-KEY"
},
```

### IMPORTANTE
Se **abiliti il Google reCaptcha DEVI aggiungere** un nuovo request body **parameter** chiamato `token`.
Il parametro `token` **DEVE contenere il grecaptcha.getResponse()** oltre al Google reCaptcha e va aggiunto al parametro `email` ai vari endpoint:

`vue-storefront-api-url/api/ext/magento1-subscribe/`

Puoi trovare queste funzioni nella tua installazione `vue-storefront`, file `core/data-resolver/NewsletterService.ts`, funzioni `subscribe` e `unsubscribe`.