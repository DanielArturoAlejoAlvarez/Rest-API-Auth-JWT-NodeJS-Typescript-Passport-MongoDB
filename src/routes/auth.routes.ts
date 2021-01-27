import { Router } from 'express'
import { signIn, signUp } from '../controllers/auth/auth.controller'


const router = Router()

router.post('/signin', signIn)
router.post('signup', signUp)
//router.get('/profile', )


export default router