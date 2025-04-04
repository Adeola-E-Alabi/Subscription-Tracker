import aj from '../Config/arcjet.js'

const arcjetMiddleware = async (req,res,next) => {
    try {
        const decision = await aj.protect(req, {requested: 1});
        if (decision.isDenied()) {
            if(decision.reason.isRateLimit()) return res.status(429).json({error: 'Rate Limit Exceeded'})
            if (decision.reason.isBot()) return res.status(403).json({error: 'Bot Detected'})
            return res.status(403).json({error: 'Access denied'})
        }
        next()
    }

    catch (error){
        console.log(`arcjet MiddleWare Error: ${error}`)
        next(error)
    }
}

export default arcjetMiddleware