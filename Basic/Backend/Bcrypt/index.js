const bcrypt = require('bcrypt')
const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(10)
    hash = await bcrypt.hash(pw, salt)
    console.log(salt)
    console.log(hash)
}

const login = async(pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw)
    if(result) {
        console.log('logged in')
    }
    else {
        console.log('incorrect')
    }
}

hashPassword('monkey')