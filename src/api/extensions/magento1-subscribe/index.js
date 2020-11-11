/*
  Questa estensione richiede l'installazione del modulo magento1-newsletter presente su repository privato git:
  http://git.ittweb.net/gitlist/magento1-newsletter/
*/
import { apiStatus } from '../../../lib/util'
import { Router } from 'express'
const request = require('request')

module.exports = ({ config }) => {
  let m1Api = Router()

  const newsletterSubscription = (email, response, action) => {
    return request({
      url: `${config.magento1.mainUrl}/ittweb_newsletter/index/${action}`,
      method: 'GET',
      json: true,
      body: { email }
    }, (error, result, body) => {
      if (error || result.statusCode !== 200) {
        console.error(error, body)
        apiStatus(response, `Risultato Magento 1: ${result.statusCode}`, result.statusCode)
      } else {
        apiStatus(response, body.status, 200)
      }
    })
  }

  const reCaptchaCheck = (action, userEmail, recaptchaToken, res) => {
    if (!userEmail) {
      return apiStatus(res, 'Email obbligatoria', 500)
    }

    if (config.googleRecaptcha) {
      if (config.googleRecaptcha.enabled === true) {
        
        if (!recaptchaToken) {
          return apiStatus(res, 'Google reCaptcha non compilato', 500)
        }
  
        const recaptchaSecretKey = config.googleRecaptcha.secretKey
        if (!recaptchaSecretKey) {
          return apiStatus(res, 'La chiave segreta del Google reCaptcha non è stata fornita!', 500)
        }
  
        request({
          'method': 'POST',
          'url': `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptchaToken}`
        }, (error, response) => {
          if (error) {
            return apiStatus(res, error, 500)
          } else {
            const jsonRes = JSON.parse(response.body)
            if (jsonRes.success === false) {
              return apiStatus(res, `Errore sul Google reCaptcha: ${jsonRes['error-codes'][0]}`, 500)
            }
          }
        })
      }
    }
    
    return newsletterSubscription(userEmail, res, action)
  }

  /**
   * GET user subscription
   */
  m1Api.get('/subscribe', (req, res) => {   
    return request({
      url: `${config.magento1.mainUrl}/ittweb_newsletter/index/check`,
      method: 'GET',
      json: true,
      body: { email: req.query.email }
    }, (error, result, body) => {
      if (error || result.statusCode !== 200) {
        console.error(error, body)
        apiStatus(res, `Risultato Magento 1: ${result.statusCode}`, result.statusCode)
      } else {
        apiStatus(res, 'subscribed', 200)
      }
    })
  })

  /**
   * POST subscribe a user
   */
  m1Api.post('/subscribe', (req, res) => {
    return reCaptchaCheck('subscribe', req.body.email, req.body.token, res)
  })

  /**
   * DELETE subscribe a user
   */
  m1Api.delete('/subscribe', (req, res) => {
    return reCaptchaCheck('unsubscribe', req.body.email, req.body.token, res)
  })

  return m1Api
}