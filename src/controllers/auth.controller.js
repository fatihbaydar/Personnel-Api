"use strict"

const passwordEncrypt = require("../helpers/passwordEncrypt")
const Personnel = require("../models/personnel.model")
const Token = require("../models/token.model")

module.exports = {
    //! Giriş ve Çıkış işlemleri

    login: async (req, res) => {

        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Giriş'
            #swagger.description = `Kullanıcı adı ve paraola ile giriş`
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    username: '*String',
                    password: '*String'
                }
            }
            _swagger.ignore = true
            _swagger.deprecated = true
        */
        const { username, password } = req.body

        if (username && password) {
            const user = await Personnel.findOne({ username, password })
            if (user && user.isActive) {
                //*kullanıcı _id özelliği her kayıt için benzersiz bir tanımlayıcıdır.Eğer token modelinde userId alanı _id eşit olan bir kaydı bulursa kullanıcın kaydı var demektir.
                let tokenData = await Token.findOne({ userId: user._id })

                if (!tokenData) {
                    //* tokenData undefined ya da null ise
                    const tokenKey = passwordEncrypt(user._id + Date.now())
                    //* burada kullanıcının benzersiz ıd si ile o anın zamanı birleşir elde edilen girdi passwordEncrypt fonksiyonuna verilir ve sonuç olarak benzersiz bir ıd oluşur.
                    console.log(tokenKey)
                    tokenData = await Token.create({ userId: user._id, token: tokenKey })
                    //*yeni oluşturalan tokenKey, kullanıcının ıd'si ile beraber veritabanına eklenir ve buna da dokenData denir.Örneğin, tokenData={userId:"123456", token: "12h64jdsak53"}
                }

                res.status(200).send({
                    error: false,
                    token: tokenData.token,
                    user
                })

            } else {
                res.errorStatusCode = 401
                throw new Error("Yanlış kullanıcı ve şifre")
            }
        } else {
            res.errorStatusCode = 403
            throw new Error("Lütfen kullanıcı adı ve şifre giriniz")
        }
    },
    logout: async (req,res) => {
        /*
            #swagger.tags = ['Authentication']
            #swagger.summary = 'Çıkış'
        */
        req.session = null // oturum bilgilerini temizle

        const auth = req.headers?.authorization || null
        const tokenKey = auth ? auth.split(" ") : null
        let deleted = null
        if(tokenKey && tokenKey[0] == "Token"){
            deleted = await Token.deleteOne({token:tokenKey[1]})
            res.status(200).send({
                message:"çıkış gerçekleşti, token silindi",
                deleted // silineni göster
            })

        }
    }
}