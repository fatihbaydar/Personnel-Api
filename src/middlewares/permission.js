"use strict"

module.exports = {
    isLogin: (req,res,next) => {
        if(req.user && req.user.isActve) {
            next()
        }else {
            res.errorStatusCode = 403
            throw new Error("Giriş yapmalısınız")
        }
    },

    isAdmin: (req,res,next) => {
        if(req.user && req.user.isActive && req.isAdmin){
            next() 
        }else {
            res.errorStatusCode = 403
            throw new Error("Admin olarak giriş yapmalısınız")
        }
    },

    isAdminOrLead: (req,res,next) => {
        if(req.user && req.user.isActive && (req.user.isAdmin || (req.user.isLead && req.user.departmentId === departmentId))){
            next() 
        }else {
            res.errorStatusCode = 403
            throw new Error("Ya admin ya da takım lideri olmalısınız")
        }
    },
}