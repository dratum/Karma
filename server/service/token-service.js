const jwt = require('jsonwebtoken')
const { Token } = require('../db/models')
const { where } = require('sequelize')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, 'JWT-SECRET-KEY', {expiresIn: '1m'})
        const refreshToken = jwt.sign(payload, 'JWT-SECRET-refr-KEY', {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where: {
            user_id: userId
        }})

        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await Token.create({user_id: userId, refreshToken})

        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await Token.destroy({ where: { refreshToken }})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await Token.findOne({ where: { refreshToken }})
        return tokenData
    }

    validateAcessToken(token) {
        
        try {
            const userData = jwt.verify(token, 'JWT-SECRET-KEY')
    
            
            return userData
        } catch (error) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, 'JWT-SECRET-refr-KEY')
            return userData
        } catch (error) {
            return null
        }
    }
}


module.exports = new TokenService()