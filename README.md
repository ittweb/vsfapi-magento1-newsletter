# vsfapi-magento1-newsletter
## Installation
This module **require the installation of the Magento 1 module**:
https://github.com/ittweb/magento1-newsletter/

After the **installation of the Magento 1 module**:
 - download the file on the /src directory, on the root of your Vue Storefront API project
 - modify the `vue-storefront-api/config/local.json` file, adding `magento1-subscribe` to the `registeredExtensions`
 - modify the `vue-storefront/config/local.json` file, changing the newsletter endpoint in `/api/ext/magento1-subscribe/subscribe`
 - restart `yarn dev` on `vue-storefront` and `vue-storefront-api`

## Google reCaptcha
Is strongly recommended to **enable the Google reCaptcha**. To do so, modify the vue-storefront-api/config/local.json file, adding this section:
```
"googleRecaptcha": {
    "enabled": true,
    "secretKey": "SECRET-KEY"
},
```

### IMPORTANT
If you **enable the Google reCaptcha you MUST** add a request body **parameter** called `token`.
The `token` parameter **MUST contain the grecaptcha.getResponse()** and the `email` parameter must been sended to the endpoint:

`vue-storefront-api-url/api/ext/magento1-subscribe/`

You can find those on `vue-storefront/core/data-resolver/NewsletterService.ts`, functions `subscribe` and `unsubscribe`.

## Other version
The same module is available on Github for [Magento 2](https://github.com/ittweb/vsfapi-magento2-newsletter/).
